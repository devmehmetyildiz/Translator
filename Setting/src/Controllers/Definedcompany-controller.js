const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetDefinedcompanies(req, res, next) {
    try {
        const definedcompanies = await db.definedcompanyModel.findAll()
        res.status(200).json(definedcompanies)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetDefinedcompaniescount(req, res, next) {
    try {
        const definedcompanies = await db.definedcompanyModel.count()
        res.status(200).json(definedcompanies)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetDefinedcompany(req, res, next) {

    let validationErrors = []
    if (!req.params.definedcompanyId) {
        validationErrors.push(messages.VALIDATION_ERROR.DEFINEDCOMPANYID_REQUIRED)
    }
    if (!validator.isUUID(req.params.definedcompanyId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DEFINEDCOMPANYID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const definedcompany = await db.definedcompanyModel.findOne({ where: { Uuid: req.params.definedcompanyId } });
        if (!definedcompany) {
            return next(createNotfounderror([messages.ERROR.DEFINEDCOMPANY_NOT_FOUND]))
        }
        if (!definedcompany.Isactive) {
            return next(createNotfounderror([messages.ERROR.DEFINEDCOMPANY_NOT_ACTIVE]))
        }
        res.status(200).json(definedcompany)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddDefinedcompany(req, res, next) {

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

    let definedcompanyuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.definedcompanyModel.create({
            ...req.body,
            Uuid: definedcompanyuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetDefinedcompanies(req, res, next)
}

async function AddArrayDefinedcompany(req, res, next) {
    let validationErrors = []
    if (Array.isArray(req.body)) {
        const t = await db.sequelize.transaction();
        try {
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

                let definedcompanyuuid = uuid()
                await db.definedcompanyModel.create({
                    ...data,
                    Uuid: definedcompanyuuid,
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
    GetDefinedcompanies(req, res, next)
}

async function UpdateDefinedcompany(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Uuid
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.DEFINEDCOMPANYID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DEFINEDCOMPANYID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const definedcompany = db.definedcompanyModel.findOne({ where: { Uuid: Uuid } })
        if (!definedcompany) {
            return next(createNotfounderror([messages.ERROR.DEFINEDCOMPANY_NOT_FOUND], req.language))
        }
        if (definedcompany.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.DEFINEDCOMPANY_NOT_ACTIVE], req.language))
        }

        await db.definedcompanyModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetDefinedcompanies(req, res, next)
}

async function DeleteDefinedcompany(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.definedcompanyId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.DEFINEDCOMPANYID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DEFINEDCOMPANYID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const definedcompany = db.definedcompanyModel.findOne({ where: { Uuid: Uuid } })
        if (!definedcompany) {
            return next(createNotfounderror([messages.ERROR.DEFINEDCOMPANY_NOT_FOUND], req.language))
        }
        if (definedcompany.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.DEFINEDCOMPANY_NOT_ACTIVE], req.language))
        }

        //  await db.definedcompanyModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await db.definedcompanyModel.update({
            Updateduser: "System",
            Updatetime: new Date(),
            Isactive: false
        }, { where: { Uuid: Uuid } }, { transaction: t })
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetDefinedcompanies(req, res, next)
}

module.exports = {
    GetDefinedcompanies,
    GetDefinedcompany,
    AddDefinedcompany,
    AddArrayDefinedcompany,
    UpdateDefinedcompany,
    DeleteDefinedcompany,
    GetDefinedcompaniescount
}