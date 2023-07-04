const config = require("../Config")
const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied, requestErrorCatcher } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetJobs(req, res, next) {
    try {
        const jobs = await db.jobModel.findAll({ where: { Isactive: true } })
        if (jobs && Array.isArray(jobs) && jobs.length > 0) {
            let languages = []
            let documents = []
            let cases = []
            try {
                const languageresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Languages`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const documentresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Documents`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const caseresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Cases`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const res = await Promise.all([languageresponse, documentresponse, caseresponse])
                languages = res[0].data
                documents = res[1].data
                cases = res[2].data
            } catch (error) {
                return next(requestErrorCatcher(error, 'Setting'))
            }
            for (const job of jobs) {
                job.Order = await db.orderModel.findOne({ where: { Uuid: OrderID } })
                job.Sourcelanguage = languages.find(u => u.Uuid === job.SourcelanguageID)
                job.Targetlanguage = languages.find(u => u.Uuid === job.TargetlanguageID)
                job.Document = documents.find(u => u.Uuid === job.DocumentID)
                job.Case = cases.find(u => u.Uuid === job.CaseID)
            }
        }
        res.status(200).json(jobs)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetJob(req, res, next) {

    let validationErrors = []
    if (!req.params.jobId) {
        validationErrors.push(messages.VALIDATION_ERROR.COURTID_REQUIRED)
    }
    if (!validator.isUUID(req.params.jobId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const job = await db.jobModel.findOne({ where: { Uuid: req.params.jobId } });
        if (!job) {
            return createNotfounderror([messages.ERROR.COURT_NOT_FOUND])
        }
        if (!job.Isactive) {
            return createNotfounderror([messages.ERROR.COURT_NOT_ACTIVE])
        }
        try {
            let languages = []
            let documents = []
            let cases = []
            const languageresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Languages`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const documentresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Documents`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const caseresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Cases`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const res = await Promise.all([languageresponse, documentresponse, caseresponse])
            languages = res[0].data
            documents = res[1].data
            cases = res[2].data
            job.Sourcelanguage = languages.find(u => u.Uuid === job.SourcelanguageID)
            job.Targetlanguage = languages.find(u => u.Uuid === job.TargetlanguageID)
            job.Document = documents.find(u => u.Uuid === job.DocumentID)
            job.Case = cases.find(u => u.Uuid === job.CaseID)
        } catch (error) {
            return next(requestErrorCatcher(error, 'Setting'))
        }
        job.Order = await db.orderModel.findOne({ where: { Uuid: OrderID } })
        res.status(200).json(job)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function AddJobs(req, res, next) {

    let validationErrors = []
    const {
        OrderID,
        Jobno,
        SourcelanguageID,
        TargetlanguageID,
        DocumentID,
        Amount,
        Price,
        CaseID,
    } = req.body

    if (!validator.isUUID(OrderID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isString(Jobno)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(SourcelanguageID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(TargetlanguageID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(DocumentID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Amount)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Price)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(CaseID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let jobuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.jobModel.create({
            ...req.body,
            Uuid: courtuuid,
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
        Jobno,
        SourcelanguageID,
        TargetlanguageID,
        DocumentID,
        Amount,
        Price,
        CaseID,
        Uuid
    } = req.body

    if (!validator.isUUID(OrderID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isString(Jobno)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(SourcelanguageID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(TargetlanguageID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(DocumentID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Amount)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Price)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(CaseID)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.COURTID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const job = db.jobModel.findOne({ where: { Uuid: Uuid } })
        if (!job) {
            return next(createNotfounderror([messages.ERROR.COURT_NOT_FOUND], req.language))
        }
        if (job.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.COURT_NOT_ACTIVE], req.language))
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
        validationErrors.push(messages.VALIDATION_ERROR.COURTID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const job = db.jobModel.findOne({ where: { Uuid: Uuid } })
        if (!job) {
            return next(createNotfounderror([messages.ERROR.COURT_NOT_FOUND], req.language))
        }
        if (job.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.COURT_NOT_ACTIVE], req.language))
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
}