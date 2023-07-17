const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetKdvs(req, res, next) {
    try {
        const kdvs = await db.kdvModel.findAll({ where: { Isactive: true } })
        res.status(200).json(kdvs)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetKdv(req, res, next) {

    let validationErrors = []
    if (!req.params.kdvId) {
        validationErrors.push(messages.VALIDATION_ERROR.KDVID_REQUIRED)
    }
    if (!validator.isUUID(req.params.kdvId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_KDVID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const kdv = await db.kdvModel.findOne({ where: { Uuid: req.params.kdvId } });
        if (!kdv) {
            return createNotfounderror([messages.ERROR.KDV_NOT_FOUND])
        }
        if (!kdv.Isactive) {
            return createNotfounderror([messages.ERROR.KDV_NOT_ACTIVE])
        }
        res.status(200).json(kdv)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddKdv(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Percent
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Percent)) {
        validationErrors.push(messages.VALIDATION_ERROR.PERCENT_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let kdvuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.kdvModel.create({
            ...req.body,
            Uuid: kdvuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetKdvs(req, res, next)
}

async function AddArrayKdv(req, res, next) {
    let validationErrors = []
    if (Array.isArray(req.body)) {
        try {
            const t = await db.sequelize.transaction();
            for (const data of req.body) {
                const {
                    Name,
                    Percent
                } = data

                if (!validator.isString(Name)) {
                    validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
                }
                if (!validator.isNumber(Percent)) {
                    validationErrors.push(messages.VALIDATION_ERROR.PERCENT_REQUIRED)
                }

                if (validationErrors.length > 0) {
                    return next(createValidationError(validationErrors, req.language))
                }

                let kdvuuid = uuid()
                await db.kdvModel.create({
                    ...data,
                    Uuid: kdvuuid,
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
        return createValidationError([messages.ERROR.DATA_ISNOT_ARRAY])
    }
    GetKdvs(req, res, next)
}

async function UpdateKdv(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Percent,
        Uuid
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Percent)) {
        validationErrors.push(messages.VALIDATION_ERROR.PERCENT_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.KDVID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_KDVID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const kdv = db.kdvModel.findOne({ where: { Uuid: Uuid } })
        if (!kdv) {
            return next(createNotfounderror([messages.ERROR.KDV_NOT_FOUND], req.language))
        }
        if (kdv.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.KDV_NOT_ACTIVE], req.language))
        }

        await db.kdvModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetKdvs(req, res, next)
}

async function DeleteKdv(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.kdvId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.KDVID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_KDVID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const kdv = db.kdvModel.findOne({ where: { Uuid: Uuid } })
        if (!kdv) {
            return next(createNotfounderror([messages.ERROR.KDV_NOT_FOUND], req.language))
        }
        if (kdv.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.KDV_NOT_ACTIVE], req.language))
        }

        await db.kdvModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetKdvs(req, res, next)
}

module.exports = {
    GetKdvs,
    GetKdv,
    AddKdv,
    AddArrayKdv,
    UpdateKdv,
    DeleteKdv,
}