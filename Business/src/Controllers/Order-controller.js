const config = require("../Config")
const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied, requestErrorCatcher } = require("../Utilities/Error")
const { Getnumerator, Createnewnumerator, Getcurrentnumerator } = require("../Utilities/Numerator")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4
const axios = require('axios')

async function GetOrders(req, res, next) {
    try {
        const orders = await db.orderModel.findAll({ where: { Isactive: true } })
        res.status(200).json(orders)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetOrderscount(req, res, next) {
    try {
        const orders = await db.orderModel.count()
        res.status(200).json(orders)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetOrder(req, res, next) {

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

    try {
        const order = await db.orderModel.findOne({ where: { Uuid: req.params.orderId } });
        if (!order) {
            return next(createNotfounderror([messages.ERROR.ORDER_NOT_FOUND]))
        }
        if (!order.Isactive) {
            return next(createNotfounderror([messages.ERROR.ORDER_NOT_ACTIVE]))
        }
        const jobs = await db.jobModel.findAll({ where: { OrderID: order.Uuid } })
        order.Jobs = jobs
        try {
            const filesresponse = await axios({
                method: 'GET',
                url: config.services.File + 'Files/GetbyorderfileID/' + order.Fileuuid,
                headers: {
                    session_key: config.session.secret
                }
            })
            order.Files = filesresponse.data
        } catch (error) {
            return next(requestErrorCatcher(error, 'File'))
        }
        res.status(200).json(order)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function AddOrders(req, res, next) {

    let validationErrors = []
    const {
        Orderno,
        RecordtypeID,
        Registerdate,
        TranslatorID,
        CaseID,
        Jobs
    } = req.body

    if (!validator.isString(Orderno)) {
        validationErrors.push(messages.VALIDATION_ERROR.ORDERNO_REQUIRED)
    }
    if (!validator.isUUID(RecordtypeID)) {
        validationErrors.push(messages.VALIDATION_ERROR.RECORDTYPEID_REQUIRED)
    }
    if (!validator.isISODate(Registerdate)) {
        validationErrors.push(messages.VALIDATION_ERROR.REGISTERDATE_REQUIRED)
    }
    if (!validator.isUUID(TranslatorID)) {
        validationErrors.push(messages.VALIDATION_ERROR.TRANSLATORID_REQUIRED)
    }
    if (!validator.isArray(Jobs)) {
        validationErrors.push(messages.VALIDATION_ERROR.JOBS_REQUIRED)
    }
    if (!validator.isUUID(CaseID)) {
        validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
    }
    if (validator.isArray(Jobs)) {
        for (const job of Jobs) {
            const {
                SourcelanguageID,
                TargetlanguageID,
                DocumentID,
                Amount,
                Price,
            } = job

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
            if (!validator.isUUID(job.CaseID)) {
                validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
            }
        }
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let orderuuid = uuid()
    const t = await db.sequelize.transaction();

    try {
        await db.orderModel.create({
            ...req.body,
            Uuid: orderuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })

        let jobnumerator = await Getcurrentnumerator(next, t)
        for (const job of Jobs) {
            let jobuuid = uuid()
            await db.jobModel.create({
                ...job,
                Uuid: jobuuid,
                Jobno: jobnumerator,
                OrderID: orderuuid,
                Createduser: "System",
                Createtime: new Date(),
                Isactive: true
            }, { transaction: t })
            jobnumerator = await Createnewnumerator(jobnumerator, next)
        }
        const filenumerator = await db.filenumeratorModel.findAll()
        if (Array.isArray(filenumerator) && filenumerator.length > 0) {
            await db.filenumeratorModel.update({
                Current: jobnumerator
            }, { where: { Id: filenumerator[0].Id } }, { transaction: t })
        } else {
            await db.filenumeratorModel.create({
                Current: jobnumerator
            }, { transaction: t })
        }
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetOrders(req, res, next)
}

async function UpdateOrders(req, res, next) {

    let validationErrors = []
    const {
        Orderno,
        RecordtypeID,
        Registerdate,
        TranslatorID,
        CaseID,
        Jobs,
        Uuid
    } = req.body

    if (!validator.isString(Orderno)) {
        validationErrors.push(messages.VALIDATION_ERROR.ORDERNO_REQUIRED)
    }
    if (!validator.isUUID(RecordtypeID)) {
        validationErrors.push(messages.VALIDATION_ERROR.RECORDTYPEID_REQUIRED)
    }
    if (!validator.isISODate(Registerdate)) {
        validationErrors.push(messages.VALIDATION_ERROR.REGISTERDATE_REQUIRED)
    }
    if (!validator.isUUID(TranslatorID)) {
        validationErrors.push(messages.VALIDATION_ERROR.TRANSLATORID_REQUIRED)
    }
    if (!validator.isArray(Jobs)) {
        validationErrors.push(messages.VALIDATION_ERROR.JOBS_REQUIRED)
    }
    if (!validator.isUUID(CaseID)) {
        validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.ORDERID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_ORDERID)
    }
    if (validator.isArray(Jobs)) {
        for (const job of Jobs) {
            const {
                OrderID,
                SourcelanguageID,
                TargetlanguageID,
                DocumentID,
                Amount,
                Price,
            } = job

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
            if (!validator.isUUID(job.CaseID)) {
                validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
            }
        }
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const order = db.orderModel.findOne({ where: { Uuid: Uuid } })
        if (!order) {
            return next(createNotfounderror([messages.ERROR.ORDER_NOT_FOUND], req.language))
        }
        if (order.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.ORDER_NOT_ACTIVE], req.language))
        }

        await db.orderModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        let jobnumerator = await Getcurrentnumerator(next)
        let isnumeratorchanged = false
        for (const job of Jobs) {
            if (validator.isUUID(job.Uuid)) {
                await db.jobModel.update({
                    ...job,
                    Updateduser: "System",
                    Updatetime: new Date(),
                }, { where: { Uuid: job.Uuid } }, { transaction: t })
            } else {
                isnumeratorchanged = true
                let jobuuid = uuid()
                await db.jobModel.create({
                    ...job,
                    Uuid: jobuuid,
                    Jobno: jobnumerator,
                    Createduser: "System",
                    Createtime: new Date(),
                    Isactive: true
                }, { transaction: t })
                jobnumerator = await Createnewnumerator(jobnumerator, next)
            }
        }
        if (isnumeratorchanged) {
            await db.filenumeratorModel.update({
                Current: jobnumerator
            }, { where: {} }, { transaction: t })
        }
        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetOrders(req, res, next)
}

async function DeleteOrders(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.orderId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.ORDERID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_ORDERID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const order = db.orderModel.findOne({ where: { Uuid: Uuid } })
        if (!order) {
            return next(createNotfounderror([messages.ERROR.ORDER_NOT_FOUND], req.language))
        }
        if (order.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.ORDER_NOT_ACTIVE], req.language))
        }

        await db.orderModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await db.jobModel.destroy({ where: { OrderID: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetOrders(req, res, next)
}

module.exports = {
    GetOrders,
    GetOrder,
    AddOrders,
    UpdateOrders,
    DeleteOrders,
    GetOrderscount
}