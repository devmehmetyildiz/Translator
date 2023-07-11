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
        if (orders && Array.isArray(orders) && orders.length > 0) {
            let Recordtypes = []
            let Courthauses = []
            let Courts = []
            let Costumers = []
            let Companies = []
            let Translators = []
            let Kdvs = []
            let Payments = []
            let Cases = []
            try {
                const recordtyperesponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Recordtypes`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const courthauseresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Courthauses`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const courtresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Courts`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const costumerresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Definedcostumers`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const companyresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Definedcompanies`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const translatorresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Translators`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const kdvresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Kdvs`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const paymentresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Payments`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const casesresponse = axios({
                    method: 'GET',
                    url: config.services.Setting + `Cases`,
                    headers: {
                        session_key: config.session.secret
                    }
                })
                const res = await Promise.all([
                    recordtyperesponse,
                    courthauseresponse,
                    courtresponse,
                    costumerresponse,
                    companyresponse,
                    translatorresponse,
                    kdvresponse,
                    paymentresponse,
                    casesresponse])
                Recordtypes = res[0].data
                Courthauses = res[1].data
                Courts = res[2].data
                Costumers = res[3].data
                Companies = res[4].data
                Translators = res[5].data
                Kdvs = res[6].data
                Payments = res[7].data
                Cases = res[8].data
            } catch (error) {
                return next(requestErrorCatcher(error, 'Setting'))
            }
            for (const order of orders) {
                order.Recordtype = Recordtypes.find(u => u.Uuid === order.RecordtypeID)
                order.Princiblecourthause = Courthauses.find(u => u.Uuid === order.PrinciblecourthauseID)
                order.Princiblecourt = Courts.find(u => u.Uuid === order.PrinciblecourtID)
                order.Directivecourthause = Courthauses.find(u => u.Uuid === order.DirectivecourthauseID)
                order.Directivecourt = Courts.find(u => u.Uuid === order.DirectivecourtID)
                order.Costumer = Costumers.find(u => u.Uuid === order.CostumerID)
                order.Company = Companies.find(u => u.Uuid === order.CompanyID)
                order.Translator = Translators.find(u => u.Uuid === order.TranslatorID)
                order.Kdv = Kdvs.find(u => u.Uuid === order.KdvID)
                order.Payment = Payments.find(u => u.Uuid === order.PaymentID)
                order.Case = Cases.find(u => u.Uuid === order.CaseID)
            }
        }
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
        let Recordtypes = []
        let Courthauses = []
        let Courts = []
        let Costumers = []
        let Companies = []
        let Translators = []
        let Kdvs = []
        let Payments = []
        let Cases = []
        let Languages = []
        let Documents = []
        try {
            const recordtyperesponse = axios({
                method: 'GET',
                url: config.services.Setting + `Recordtypes`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const courthauseresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Courthauses`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const courtresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Courts`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const costumerresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Costumers`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const companyresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Companies`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const translatorresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Translators`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const kdvresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Kdvs`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const paymentresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Payments`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const casesresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Cases`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const languageresponse = axios({
                method: 'GET',
                url: config.services.Setting + `Languages`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const documentreponse = axios({
                method: 'GET',
                url: config.services.Setting + `Documents`,
                headers: {
                    session_key: config.session.secret
                }
            })
            const res = await Promise.all([
                recordtyperesponse,
                courthauseresponse,
                courtresponse,
                costumerresponse,
                companyresponse,
                translatorresponse,
                kdvresponse,
                paymentresponse,
                casesresponse,
                languageresponse,
                documentreponse])
            Recordtypes = res[0].data
            Courthauses = res[1].data
            Courts = res[2].data
            Costumers = res[3].data
            Companies = res[4].data
            Translators = res[5].data
            Kdvs = res[6].data
            Payments = res[7].data
            Cases = res[8].data
            Languages = res[9].data
            Documents = res[10].data
        } catch (error) {
            return next(requestErrorCatcher(error, 'Setting'))
        }
        order.Recordtype = Recordtypes.find(u => u.Uuid === order.RecordtypeID)
        order.Princiblecourthause = Courthauses.find(u => u.Uuid === order.PrinciblecourthauseID)
        order.Princiblecourt = Courts.find(u => u.Uuid === order.PrinciblecourtID)
        order.Directivecourthause = Courthauses.find(u => u.Uuid === order.DirectivecourthauseID)
        order.Directivecourt = Courts.find(u => u.Uuid === order.DirectivecourtID)
        order.Costumer = Costumers.find(u => u.Uuid === order.CostumerID)
        order.Company = Companies.find(u => u.Uuid === order.CompanyID)
        order.Translator = Translators.find(u => u.Uuid === order.TranslatorID)
        order.Kdv = Kdvs.find(u => u.Uuid === order.KdvID)
        order.Payment = Payments.find(u => u.Uuid === order.PaymentID)
        order.Case = Cases.find(u => u.Uuid === order.CaseID)

        const jobs = await db.jobModel.findAll({ where: OrderID === order.Uuid })
        for (const job of jobs) {
            job.Sourcelanguage = Languages.find(u => u.Uuid === job.SourcelanguageID)
            job.Targetlanguage = Languages.find(u => u.Uuid === job.TargetlanguageID)
            job.Document = Documents.find(u => u.Uuid === job.DocumentID)
            job.Case = Cases.find(u => u.Uuid === job.CaseID)
        }
        order.Jobs = jobs
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

        let jobnumerator = Getcurrentnumerator(next)
        for (const job of Jobs) {
            if (validator.isUUID(job.Uuid)) {
                await db.jobModel.update({
                    ...job,
                    Updateduser: "System",
                    Updatetime: new Date(),
                }, { where: { Uuid: job.Uuid } }, { transaction: t })
            } else {
                let jobuuid = uuid()
                await db.jobModel.create({
                    ...job,
                    Uuid: jobuuid,
                    Jobno: jobnumerator,
                    Createduser: "System",
                    Createtime: new Date(),
                    Isactive: true
                }, { transaction: t })
                jobnumerator = Createnewnumerator(jobnumerator, next)
            }
        }
        await db.filenumeratorModel.update({
            Current: jobnumerator
        }, {}, { transaction: t })
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
}