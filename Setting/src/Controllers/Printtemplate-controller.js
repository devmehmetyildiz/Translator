const config = require("../Config")
const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied, requestErrorCatcher } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4
const axios = require('axios')

async function GetPrinttemplates(req, res, next) {
    try {
        const printtemplates = await db.printtemplateModel.findAll()
        res.status(200).json(printtemplates)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetPrinttemplatescount(req, res, next) {
    try {
        const printtemplates = await db.printtemplateModel.count()
        res.status(200).json(printtemplates)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetPrinttemplate(req, res, next) {

    let validationErrors = []
    if (!req.params.printtemplateId) {
        validationErrors.push(messages.VALIDATION_ERROR.PRINTTEMPLATEID_REQUIRED)
    }
    if (!validator.isUUID(req.params.printtemplateId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_PRINTTEMPLATEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const printtemplate = await db.printtemplateModel.findOne({ where: { Uuid: req.params.printtemplateId } });
        if (!printtemplate) {
            return next(createNotfounderror([messages.ERROR.PRINTTEMPLATE_NOT_FOUND], req.language))
        }
        if (!printtemplate.Isactive) {
            return next(createNotfounderror([messages.ERROR.PRINTTEMPLATE_NOT_ACTIVE], req.language))
        }
        res.status(200).json(printtemplate)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function AddPrinttemplate(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Printtemplate,
        Valuekey,
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isString(Printtemplate)) {
        validationErrors.push(messages.VALIDATION_ERROR.PRINTTEMPLATE_REQUIRED)
    }
    if (!validator.isString(Valuekey)) {
        validationErrors.push(messages.VALIDATION_ERROR.VALUEKEY_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let printtemplateuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.printtemplateModel.create({
            ...req.body,
            Uuid: printtemplateuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })

        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetPrinttemplates(req, res, next)
}

async function UpdatePrinttemplate(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Printtemplate,
        Valuekey,
        Uuid
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isString(Printtemplate)) {
        validationErrors.push(messages.VALIDATION_ERROR.PRINTTEMPLATE_REQUIRED)
    }
    if (!validator.isString(Valuekey)) {
        validationErrors.push(messages.VALIDATION_ERROR.VALUEKEY_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.PRINTTEMPLATEID_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_PRINTTEMPLATEID)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const printtemplate = await db.printtemplateModel.findOne({ where: { Uuid: Uuid } })
        if (!printtemplate) {
            return next(createNotfounderror([messages.ERROR.PRINTTEMPLATE_NOT_FOUND], req.language))
        }
        if (!printtemplate.Isactive) {
            return next(createAccessDenied([messages.ERROR.PRINTTEMPLATE_NOT_ACTIVE], req.language))
        }

        await db.printtemplateModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        await t.rollback()
        return next(sequelizeErrorCatcher(error))
    }
    GetPrinttemplates(req, res, next)
}

async function DeletePrinttemplate(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.printtemplateId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.PRINTTEMPLATEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_PRINTTEMPLATEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const printtemplate = await db.printtemplateModel.findOne({ where: { Uuid: Uuid } })
        if (!printtemplate) {
            return next(createNotfounderror([messages.ERROR.PRINTTEMPLATE_NOT_FOUND], req.language))
        }
        if (!printtemplate.Isactive) {
            return next(createAccessDenied([messages.ERROR.PRINTTEMPLATE_NOT_ACTIVE], req.language))
        }

        // await db.printtemplateModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await db.printtemplateModel.update({
            Updateduser: "System",
            Updatetime: new Date(),
            Isactive: false
        }, { where: { Uuid: Uuid } }, { transaction: t })
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetPrinttemplates(req, res, next)
}

module.exports = {
    GetPrinttemplates,
    GetPrinttemplate,
    AddPrinttemplate,
    UpdatePrinttemplate,
    DeletePrinttemplate,
    GetPrinttemplatescount
}