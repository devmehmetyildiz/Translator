const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetRecordtypes(req, res, next) {
    try {
        const recordtypes = await db.recordtypeModel.findAll({ where: { Isactive: true } })
        res.status(200).json(recordtypes)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetRecordtype(req, res, next) {

    let validationErrors = []
    if (!req.params.recordtypeId) {
        validationErrors.push(messages.VALIDATION_ERROR.RECORDTYPEID_REQUIRED)
    }
    if (!validator.isUUID(req.params.recordtypeId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_RECORDTYPEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const recordtype = await db.recordtypeModel.findOne({ where: { Uuid: req.params.recordtypeId } });
        if (!recordtype) {
            return createNotfounderror([messages.ERROR.RECORDTYPE_NOT_FOUND])
        }
        if (!recordtype.Isactive) {
            return createNotfounderror([messages.ERROR.RECORDTYPE_NOT_ACTIVE])
        }
        res.status(200).json(recordtype)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddRecordtype(req, res, next) {

    let validationErrors = []
    const {
        Name,
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let recordtypeuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.recordtypeModel.create({
            ...req.body,
            Uuid: recordtypeuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetRecordtypes(req, res, next)
}

async function AddArrayRecordtype(req, res, next) {
    let validationErrors = []
    if (Array.isArray(req.body)) {
        try {
            const t = await db.sequelize.transaction();
            for (const data of req.body) {
                const {
                    Name,
                } = data

                if (!validator.isString(Name)) {
                    validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
                }

                if (validationErrors.length > 0) {
                    return next(createValidationError(validationErrors, req.language))
                }

                let recordtypeuuid = uuid()
                await db.recordtypeModel.create({
                    ...data,
                    Uuid: recordtypeuuid,
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
    GetRecordtypes(req, res, next)
}

async function UpdateRecordtype(req, res, next) {

    let validationErrors = []
    const {
        Uuid,
        Name,
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.RECORDTYPEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_RECORDTYPEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const recordtype = db.recordtypeModel.findOne({ where: { Uuid: Uuid } })
        if (!recordtype) {
            return next(createNotfounderror([messages.ERROR.RECORDTYPE_NOT_FOUND], req.language))
        }
        if (recordtype.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.RECORDTYPE_NOT_ACTIVE], req.language))
        }

        await db.recordtypeModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetRecordtypes(req, res, next)
}

async function DeleteRecordtype(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.recordtypeId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.RECORDTYPEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_RECORDTYPEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const recordtype = db.recordtypeModel.findOne({ where: { Uuid: Uuid } })
        if (!recordtype) {
            return next(createNotfounderror([messages.ERROR.RECORDTYPE_NOT_FOUND], req.language))
        }
        if (recordtype.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.RECORDTYPE_NOT_ACTIVE], req.language))
        }

        await db.recordtypeModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetRecordtypes(req, res, next)
}

module.exports = {
    GetRecordtypes,
    GetRecordtype,
    AddRecordtype,
    AddArrayRecordtype,
    UpdateRecordtype,
    DeleteRecordtype,
}