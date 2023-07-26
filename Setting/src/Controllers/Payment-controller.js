const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetPayments(req, res, next) {
    try {
        const payments = await db.paymentModel.findAll({ where: { Isactive: true } })
        res.status(200).json(payments)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetPaymentscount(req, res, next) {
    try {
        const payments = await db.paymentModel.count()
        res.status(200).json(payments)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetPayment(req, res, next) {

    let validationErrors = []
    if (!req.params.paymentId) {
        validationErrors.push(messages.VALIDATION_ERROR.PAYMENTID_REQUIRED)
    }
    if (!validator.isUUID(req.params.paymentId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_PAYMENTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const payment = await db.paymentModel.findOne({ where: { Uuid: req.params.paymentId } });
        if (!payment) {
            return next(createNotfounderror([messages.ERROR.PAYMENT_NOT_FOUND]))
        }
        if (!payment.Isactive) {
            return next(createNotfounderror([messages.ERROR.PAYMENT_NOT_ACTIVE]))
        }
        res.status(200).json(payment)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddPayment(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Isdefaultpayment
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let paymentuuid = uuid()

    const t = await db.sequelize.transaction();

    try {

        if (Isdefaultpayment) {
            const payments = await db.paymentModel.findAll({ where: { Isactive: true } })
            for (const payment of payments) {
                await db.paymentModel.update({
                    ...payment,
                    Isdefaultpayment: Isdefaultpayment ? false : payment.Isdefaultpayment,
                    Updateduser: "System",
                    Updatetime: new Date(),
                }, { where: { Uuid: payment.Uuid } }, { transaction: t })
            }
        }

        await db.paymentModel.create({
            ...req.body,
            Uuid: paymentuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetPayments(req, res, next)
}

async function AddArrayPayment(req, res, next) {
    let validationErrors = []
    if (Array.isArray(req.body)) {
        try {
            const t = await db.sequelize.transaction();
            for (const data of req.body) {
                const {
                    Name,
                    Isdefaultpayment
                } = data

                if (!validator.isString(Name)) {
                    validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
                }

                if (validationErrors.length > 0) {
                    return next(createValidationError(validationErrors, req.language))
                }

                if (Isdefaultpayment) {
                    const payments = await db.paymentModel.findAll({ where: { Isactive: true } })
                    for (const payment of payments) {
                        await db.paymentModel.update({
                            ...payment,
                            Isdefaultpayment: Isdefaultpayment ? false : payment.Isdefaultpayment,
                            Updateduser: "System",
                            Updatetime: new Date(),
                        }, { where: { Uuid: payment.Uuid } }, { transaction: t })
                    }
                }

                let paymentuuid = uuid()
                await db.paymentModel.create({
                    ...data,
                    Uuid: paymentuuid,
                    Createduser: "System",
                    Createtime: new Date(),
                    Isactive: true
                }, { transaction: t })
            }
            await t.commit()
        } catch (err) {
            await t.rollback()
            return next(sequelizeErrorCatcher(err))
        }
    } else {
        return next(createValidationError([messages.ERROR.DATA_ISNOT_ARRAY]))
    }
    GetPayments(req, res, next)
}

async function UpdatePayment(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Uuid,
        Isdefaultpayment
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.PAYMENTID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_PAYMENTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const payment = db.paymentModel.findOne({ where: { Uuid: Uuid } })
        if (!payment) {
            return next(createNotfounderror([messages.ERROR.PAYMENT_NOT_FOUND], req.language))
        }
        if (payment.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.PAYMENT_NOT_ACTIVE], req.language))
        }

        if (Isdefaultpayment) {
            const allpayments = await db.paymentModel.findAll({ where: { Isactive: true } })
            for (const paymentdata of allpayments) {
                await db.paymentModel.update({
                    ...paymentdata,
                    Isdefaultpayment: Isdefaultpayment ? false : paymentdata.Isdefaultpayment,
                    Updateduser: "System",
                    Updatetime: new Date(),
                }, { where: { Uuid: paymentdata.Uuid } }, { transaction: t })
            }
        }

        await db.paymentModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetPayments(req, res, next)
}

async function DeletePayment(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.paymentId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.PAYMENTID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_PAYMENTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const payment = db.paymentModel.findOne({ where: { Uuid: Uuid } })
        if (!payment) {
            return next(createNotfounderror([messages.ERROR.PAYMENT_NOT_FOUND], req.language))
        }
        if (payment.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.PAYMENT_NOT_ACTIVE], req.language))
        }

        await db.paymentModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetPayments(req, res, next)
}

module.exports = {
    GetPayments,
    GetPayment,
    AddPayment,
    AddArrayPayment,
    UpdatePayment,
    DeletePayment,
    GetPaymentscount
}