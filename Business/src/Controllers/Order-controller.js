const { Op, where } = require("sequelize")
const config = require("../Config")
const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied, requestErrorCatcher } = require("../Utilities/Error")
const http = require("../Utilities/Http")
const { Getnumerator, Createnewnumerator, Getcurrentnumerator } = require("../Utilities/Numerator")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4
const axios = require('axios')

async function GetOrders(req, res, next) {
    try {
        const startDate = req.query.Startdate
        const endDate = req.query.Enddate
        let whereClause = {
            Deliverydate: {
                [Op.between]: [startDate, endDate],
            },
        };
        let orders = null
        orders = (startDate && endDate) ? await db.orderModel.findAll({ where: whereClause }) : await db.orderModel.findAll()
        res.status(200).json(orders)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetOrdersforchart(req, res, next) {
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
            Isactive: true
        };

        let recordtypes = []
        let orders = []
        if (req.query.RecordtypeID && validator.isUUID(req.query.RecordtypeID)) {
            whereClause.RecordtypeID = req.query.RecordtypeID;
        }
        orders = await db.orderModel.findAll({
            where: whereClause,
            attributes: [
                'RecordtypeID',
                'Deliverydate',
                [db.orderModel.sequelize.fn('SUM', db.orderModel.sequelize.col('Calculatedprice')), 'Calculatedprice'],
                [db.orderModel.sequelize.fn('SUM', db.orderModel.sequelize.col('Netprice')), 'Netprice'],
            ],
            group: ['Deliverydate', 'RecordtypeID'],
        })
        try {
            recordtypes = await http('GET', config.services.Setting + `Recordtypes`)
        } catch (error) {
            return next(requestErrorCatcher(error, 'Setting'))
        }
        let finalOrder = createPriceAndDateArray(startDate, endDate);
        (orders || []).forEach(data => {
            let Pricetype = recordtypes.find(u => u.Uuid === data.RecordtypeID)?.Pricetype
            let priceinfinalorder = finalOrder.find(u => u.Deliverydate === data.Deliverydate)
            if (priceinfinalorder) {
                priceinfinalorder.Calculatedprice += (Pricetype ? Pricetype : 0) * data.Calculatedprice
                priceinfinalorder.Netprice += (Pricetype ? Pricetype : 0) * data.Netprice
            } else {
                finalOrder.push({
                    Deliverydate: data.Deliverydate,
                    Calculatedprice: (Pricetype ? Pricetype : 0) * data.Calculatedprice,
                    Netprice: (Pricetype ? Pricetype : 0) * data.Netprice
                })
            }
        });

        res.status(200).json(finalOrder)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }

}

function createPriceAndDateArray(startDate, endDate) {
    const priceAndDateArray = [];
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        priceAndDateArray.push({
            Deliverydate: formatDate(currentDate),
            Calculatedprice: 0,
            Netprice: 0,
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

async function GetOrderswithdate(req, res, next) {
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

    const orders = await db.orderModel.findAll({ where: { Deliverydate: { [Op.between]: [startDate, endDate] } } })
    res.status(200).json(orders)

}

async function GetPricenet(req, res, next) {
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
            Isactive: true
        };

        let recordtypes = []
        let finalprice = 0
        if (req.query.RecordtypeID && validator.isUUID(req.query.RecordtypeID)) {
            whereClause.RecordtypeID = req.query.RecordtypeID;
            finalprice = await db.orderModel.sum('Netprice', {
                where: whereClause
            })
        } else {
            try {
                recordtypes = await http('GET', config.services.Setting + `Recordtypes`)
            } catch (error) {
                return next(requestErrorCatcher(error, 'Setting'))
            }
            whereClause.RecordtypeID = {
                [Op.in]: recordtypes.filter(u => u.Pricetype === 1).map(u => { return u.Uuid })
            }
            const plusprice = await db.orderModel.sum('Netprice', {
                where: whereClause
            })
            whereClause.RecordtypeID = {
                [Op.in]: recordtypes.filter(u => u.Pricetype === -1).map(u => { return u.Uuid })
            }
            const minusprice = await db.orderModel.sum('Netprice', {
                where: whereClause
            })
            finalprice = (plusprice ? plusprice : 0) - (minusprice ? minusprice : 0)
        }
        res.status(200).json(finalprice ? finalprice : 0)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetPricepotancial(req, res, next) {
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
            Isactive: true
        };

        let recordtypes = []
        let finalprice = 0
        if (req.query.RecordtypeID && validator.isUUID(req.query.RecordtypeID)) {
            whereClause.RecordtypeID = req.query.RecordtypeID;
            finalprice = await db.orderModel.sum('Calculatedprice', {
                where: whereClause
            })
        } else {
            try {
                recordtypes = await http('GET', config.services.Setting + `Recordtypes`)
            } catch (error) {
                return next(requestErrorCatcher(error, 'Setting'))
            }
            whereClause.RecordtypeID = {
                [Op.in]: recordtypes.filter(u => u.Pricetype === 1).map(u => { return u.Uuid })
            }
            const plusprice = await db.orderModel.sum('Calculatedprice', {
                where: whereClause
            })
            whereClause.RecordtypeID = {
                [Op.in]: recordtypes.filter(u => u.Pricetype === -1).map(u => { return u.Uuid })
            }
            const minusprice = await db.orderModel.sum('Calculatedprice', {
                where: whereClause
            })
            finalprice = (plusprice ? plusprice : 0) - (minusprice ? minusprice : 0)
        }
        res.status(200).json(finalprice ? finalprice : 0)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetPricereal(req, res, next) {
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
            Isactive: true
        };

        let recordtypes = []
        let finalprice = 0
        try {
            recordtypes = await http('GET', config.services.Setting + `Recordtypes`)
        } catch (error) {
            return next(requestErrorCatcher(error, 'Setting'))
        }
        if (req.query.RecordtypeID && validator.isUUID(req.query.RecordtypeID)) {
            recordtypes.find(u => u.Uuid === RecordtypeID)?.Pricetype === 1 && (whereClause.RecordtypeID = req.query.RecordtypeID)
            finalprice = await db.orderModel.sum('Netprice', {
                where: whereClause
            })
        } else {
            whereClause.RecordtypeID = {
                [Op.in]: recordtypes.filter(u => u.Pricetype === 1).map(u => { return u.Uuid })
            }
            const plusprice = await db.orderModel.sum('Netprice', {
                where: whereClause
            })
            finalprice = (plusprice ? plusprice : 0)
        }
        res.status(200).json(finalprice ? finalprice : 0)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetPriceexpence(req, res, next) {
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
            Isactive: true
        };

        let finalprice = 0
        let recordtypes = []
        try {
            recordtypes = await http('GET', config.services.Setting + `Recordtypes`)
        } catch (error) {
            return next(requestErrorCatcher(error, 'Setting'))
        }
        if (req.query.RecordtypeID && validator.isUUID(req.query.RecordtypeID)) {
            recordtypes.find(u => u.Uuid === RecordtypeID)?.Pricetype === -1 && (whereClause.RecordtypeID = req.query.RecordtypeID)
            finalprice = await db.orderModel.sum('Netprice', {
                where: whereClause
            })
        } else {
            whereClause.RecordtypeID = {
                [Op.in]: recordtypes.filter(u => u.Pricetype === -1).map(u => { return u.Uuid })
            }
            const minusprice = await db.orderModel.sum('Netprice', {
                where: whereClause
            })
            finalprice = (minusprice ? minusprice : 0)
        }
        res.status(200).json(finalprice)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetOrdercountbydate(req, res, next) {
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
            Isactive: true
        };
        let orders = []
        if (req.query.RecordtypeID && validator.isUUID(req.query.RecordtypeID)) {
            whereClause.RecordtypeID = req.query.RecordtypeID;
        }
        orders = await db.orderModel.count({
            where: whereClause
        })
        res.status(200).json(orders)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetOrdercountwithjob(req, res, next) {
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
            Isactive: true
        };
        let orders = []
        if (req.query.RecordtypeID && validator.isUUID(req.query.RecordtypeID)) {
            whereClause.RecordtypeID = req.query.RecordtypeID;
        }
        orders = await db.orderModel.findAll({
            where: whereClause
        })
        const jobs = await db.jobModel.count({
            where: {
                OrderID: {
                    [Op.in]: orders.map(u => { return u.Uuid })
                },
            }
        })
        res.status(200).json(jobs)
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
        let Cases = []
        let Languages = []
        let Documents = []
        try {
            const res = await Promise.all([
                http('GET', config.services.Setting + `Cases`),
                http('GET', config.services.Setting + `Languages`),
                http('GET', config.services.Setting + `Documents`),
                http('GET', config.services.Setting + `Recordtypes/${order.RecordtypeID}`),
                http('GET', config.services.Setting + `Courthauses/${order.PrinciblecourthauseID}`),
                http('GET', config.services.Setting + `Courts/${order.PrinciblecourtID}`),
                http('GET', config.services.Setting + `Courthauses/${order.DirectivecourthauseID}`),
                http('GET', config.services.Setting + `Courts/${order.DirectivecourtID}`),
                http('GET', config.services.Setting + `Definedcostumers/${order.CostumerID}`),
                http('GET', config.services.Setting + `Definedcompanies/${order.CompanyID}`),
                http('GET', config.services.Setting + `Translators/${order.TranslatorID}`),
                http('GET', config.services.Setting + `Kdvs/${order.KdvID}`),
                http('GET', config.services.Setting + `Payments/${order.PaymentID}`),
                http('GET', config.services.File + `Files/GetbyorderfileID/${order.Fileuuid}`),
            ])
            Cases = res[0]
            Languages = res[1]
            Documents = res[2]
            order.Recordtype = res[3]
            order.Princiblecourthause = res[4]
            order.Princiblecourt = res[5]
            order.Directivecourthause = res[6]
            order.Directivecourt = res[7]
            order.Costumer = res[8]
            order.Company = res[9]
            order.Translator = res[10]
            order.Kdv = res[11]
            order.Payment = res[12]
            order.Files = res[13]
        } catch (error) {
            return next(requestErrorCatcher(error, 'Setting'))
        }
        order.Case = Cases.find(u => u.Uuid === order.CaseID)

        const jobs = await db.jobModel.findAll({ where: { OrderID: order.Uuid, Isactive: true } })
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

        //await db.orderModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await db.orderModel.update({
            Updateduser: "System",
            Updatetime: new Date(),
            Isactive: false
        }, { where: { Uuid: Uuid } }, { transaction: t })
        //await db.jobModel.destroy({ where: { OrderID: Uuid }, transaction: t });
        await db.jobModel.update({
            Updateduser: "System",
            Updatetime: new Date(),
            Isactive: false
        }, { where: { OrderID: Uuid } }, { transaction: t })
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
    GetOrderscount,
    GetPricenet,
    GetPricepotancial,
    GetPricereal,
    GetPriceexpence,
    GetOrdercountbydate,
    GetOrdercountwithjob,
    GetOrderswithdate,
    GetOrdersforchart
}