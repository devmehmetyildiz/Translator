const { Op } = require("sequelize")
const config = require("../Config")
const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied, requestErrorCatcher } = require("../Utilities/Error")
const { Getnumerator } = require("../Utilities/Numerator")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4
const axios = require('axios')

async function GetbyorderID(req, res, next) {
    try {
        let validationErrors = []
        if (!req.params.orderId) {
            validationErrors.push(messages.VALIDATION_ERROR.ORDERID_REQUIRED)
        }
        if (!validator.isUUID(req.params.orderId)) {
            validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_ORDERID)
        }
        if (validationErrors.length > 0) {
            return next(createValidationError(validationErrors, req.language))
        }
        const jobs = await db.jobModel.findAll({ where: { OrderID: req.params.orderId, Isactive: true } })
        for (const job of jobs) {
            job.Order = await db.orderModel.findOne({ where: { Uuid: job.OrderID } })
        }
        res.status(200).json(jobs)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetJobs(req, res, next) {
    try {
        const jobs = await db.jobModel.findAll({ where: { Isactive: true } })
        for (const job of jobs) {
            job.Order = await db.orderModel.findOne({ where: { Uuid: job.OrderID } })
        }
        res.status(200).json(jobs)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function Getjobpricewithdocumentlanguage(req, res, next) {
    try {
        let validationErrors = []
        if (!req.query.Startdate || !validator.isISODate(req.query.Startdate)) {
            validationErrors.push(messages.VALIDATION_ERROR.STARTDATE_REQUIRED)
        }
        if (!req.query.Enddate || !validator.isISODate(req.query.Enddate)) {
            validationErrors.push(messages.VALIDATION_ERROR.ENDDATE_REQUIRED)
        }
        if (validationErrors.length > 0) {
            return next(createValidationError(validationErrors, req.language))
        }

        const startDate = req.query.Startdate
        const endDate = req.query.Enddate

        let whereClause = {
            Deliverydate: {
                [Op.between]: [startDate, endDate],
            },
        };

        let documents = []
        let languages = []
        let orders = []
        let jobs = []
        if (req.query.RecordtypeID && validator.isUUID(req.query.RecordtypeID)) {
            whereClause.RecordtypeID = req.query.RecordtypeID;
        }
        orders = await db.orderModel.findAll({
            where: whereClause,
        })
        const orderUuids = orders.map(u => `'${u.Uuid}'`).join(',');
        console.log('orders: ', orders);
        console.log('orderUuids: ', orderUuids);
        jobs = orders.length > 0 ? await db.sequelize.query(
            `SELECT j.OrderID,j.Price ,j.DocumentID, j.TargetlanguageID, o.Deliverydate FROM jobs j LEFT JOIN orders o ON j.OrderID = o.Uuid WHERE j.OrderID IN(${orderUuids})`,
            { type: db.sequelize.QueryTypes.SELECT }
        ) : []
        console.log('jobs: ', jobs);
        let documentArray = {};
        [...new Set(jobs.map(u => { return u.DocumentID }))].forEach(u => {
            documentArray[u] = createvalueAndDateArray(startDate, endDate)
        })
        let languageArray = {};
        [...new Set(jobs.map(u => { return u.TargetlanguageID }))].forEach(u => {
            languageArray[u] = createvalueAndDateArray(startDate, endDate)
        })

        jobs.forEach(job => {
            let findeddocument = documentArray[job.DocumentID].find(u => u.Deliverydate === job.Deliverydate)
            if (findeddocument) {
                findeddocument.Count++;
                findeddocument.Price += job.Price
            }
            let findedlanguage = languageArray[job.TargetlanguageID].find(u => u.Deliverydate === job.Deliverydate)
            if (findedlanguage) {
                findedlanguage.Count++;
                findedlanguage.Price += job.Price
            }
        });

        res.status(200).json({ Documents: documentArray, Languages: languageArray })
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

function createvalueAndDateArray(startDate, endDate) {
    const priceAndDateArray = [];
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        priceAndDateArray.push({
            Deliverydate: formatDate(currentDate),
            Price: 0,
            Count: 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return priceAndDateArray;
}

function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

async function GetJobscount(req, res, next) {
    try {
        const jobs = await db.jobModel.count()
        res.status(200).json(jobs)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetJob(req, res, next) {

    let validationErrors = []
    if (!req.params.jobId) {
        validationErrors.push(messages.VALIDATION_ERROR.JOBID_REQUIRED)
    }
    if (!validator.isUUID(req.params.jobId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_JOBID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const job = await db.jobModel.findOne({ where: { Uuid: req.params.jobId } });
        if (!job) {
            return next(createNotfounderror([messages.ERROR.JOB_NOT_FOUND]))
        }
        if (!job.Isactive) {
            return next(createNotfounderror([messages.ERROR.JOB_NOT_ACTIVE]))
        }
        job.Order = await db.orderModel.findOne({ where: { Uuid: job.OrderID } })
        res.status(200).json(job)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function AddJobs(req, res, next) {

    let validationErrors = []
    const {
        OrderID,
        SourcelanguageID,
        TargetlanguageID,
        DocumentID,
        Amount,
        Price,
        CaseID,
    } = req.body

    if (!validator.isUUID(OrderID)) {
        validationErrors.push(messages.VALIDATION_ERROR.ORDERID_REQUIRED)
    }
    if (!validator.isUUID(SourcelanguageID)) {
        validationErrors.push(messages.VALIDATION_ERROR.SOURCELANGUAGEID_REQUIRED)
    }
    if (!validator.isUUID(TargetlanguageID)) {
        validationErrors.push(messages.VALIDATION_ERROR.TARGETLANGUAGEID_REQUIRED)
    }
    if (!validator.isUUID(DocumentID)) {
        validationErrors.push(messages.VALIDATION_ERROR.DOCUMENTID_REQUIRED)
    }
    if (!validator.isNumber(Amount)) {
        validationErrors.push(messages.VALIDATION_ERROR.AMOUNT_REQUIRED)
    }
    if (!validator.isNumber(Price)) {
        validationErrors.push(messages.VALIDATION_ERROR.PRICE_REQUIRED)
    }
    if (!validator.isUUID(CaseID)) {
        validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();

    let jobuuid = uuid()
    let jobnumerator = Getnumerator(next, t)
    try {
        await db.jobModel.create({
            ...req.body,
            Uuid: jobuuid,
            Jobno: jobnumerator,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetJobs(req, res, next)
}

async function UpdateJobs(req, res, next) {

    let validationErrors = []
    const {
        OrderID,
        SourcelanguageID,
        TargetlanguageID,
        DocumentID,
        Amount,
        Price,
        CaseID,
        Uuid
    } = req.body

    if (!validator.isUUID(OrderID)) {
        validationErrors.push(messages.VALIDATION_ERROR.ORDERID_REQUIRED)
    }
    if (!validator.isUUID(SourcelanguageID)) {
        validationErrors.push(messages.VALIDATION_ERROR.SOURCELANGUAGEID_REQUIRED)
    }
    if (!validator.isUUID(TargetlanguageID)) {
        validationErrors.push(messages.VALIDATION_ERROR.TARGETLANGUAGEID_REQUIRED)
    }
    if (!validator.isUUID(DocumentID)) {
        validationErrors.push(messages.VALIDATION_ERROR.DOCUMENTID_REQUIRED)
    }
    if (!validator.isNumber(Amount)) {
        validationErrors.push(messages.VALIDATION_ERROR.AMOUNT_REQUIRED)
    }
    if (!validator.isNumber(Price)) {
        validationErrors.push(messages.VALIDATION_ERROR.PRICE_REQUIRED)
    }
    if (!validator.isUUID(CaseID)) {
        validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.JOBID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_JOBID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const job = db.jobModel.findOne({ where: { Uuid: Uuid } })
        if (!job) {
            return next(createNotfounderror([messages.ERROR.JOB_NOT_FOUND], req.language))
        }
        if (job.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.JOB_NOT_ACTIVE], req.language))
        }

        await db.jobModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetJobs(req, res, next)
}

async function DeleteJobs(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.jobId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.JOBID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_JOBID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const job = db.jobModel.findOne({ where: { Uuid: Uuid } })
        if (!job) {
            return next(createNotfounderror([messages.ERROR.JOB_NOT_FOUND], req.language))
        }
        if (job.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.JOB_NOT_ACTIVE], req.language))
        }

        await db.jobModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetJobs(req, res, next)
}

module.exports = {
    GetJobs,
    GetJob,
    AddJobs,
    UpdateJobs,
    DeleteJobs,
    GetbyorderID,
    GetJobscount,
    Getjobpricewithdocumentlanguage
}