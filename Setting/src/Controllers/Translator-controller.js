const config = require("../Config")
const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4
const axios = require('axios')

async function GetTranslators(req, res, next) {
    try {
        const translators = await db.tranlatorModel.findAll({ where: { Isactive: true } })
        for (const translator of translators) {
            const userresponse = await axios({
                method: 'GET',
                url: config.services.Userrole + `Users/${translator.UserID}`,
                headers: {
                    session_key: config.session.secret
                }
            })
            translator.User = userresponse.data
        }
        res.status(200).json(translators)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetTranslator(req, res, next) {

    let validationErrors = []
    if (!req.params.translatorId) {
        validationErrors.push(messages.VALIDATION_ERROR.TRANSLATORID_REQUIRED)
    }
    if (!validator.isUUID(req.params.translatorId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_TRANSLATORID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const translator = await db.tranlatorModel.findOne({ where: { Uuid: req.params.translatorId } });
        if (!translator) {
            return createNotfounderror([messages.ERROR.TRANSLATOR_NOT_FOUND])
        }
        if (!translator.Isactive) {
            return createNotfounderror([messages.ERROR.TRANSLATOR_NOT_ACTIVE])
        }
        const userresponse = await axios({
            method: 'GET',
            url: config.services.Userrole + `Users/${translator.UserID}`,
            headers: {
                session_key: config.session.secret
            }
        })
        translator.User = userresponse.data
        res.status(200).json(translator)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddTranslator(req, res, next) {

    let validationErrors = []
    const {
        Name,
        UserID
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(UserID)) {
        validationErrors.push(messages.VALIDATION_ERROR.USERID_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let translatoruuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.translatorModel.create({
            ...req.body,
            Uuid: translatoruuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetTranslators(req, res, next)
}

async function UpdateTranslator(req, res, next) {

    let validationErrors = []
    const {
        Uuid,
        Name,
        UserID
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isUUID(UserID)) {
        validationErrors.push(messages.VALIDATION_ERROR.USERID_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.TRANSLATORID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_TRANSLATORID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const translator = db.translatorModel.findOne({ where: { Uuid: Uuid } })
        if (!translator) {
            return next(createNotfounderror([messages.ERROR.TRANSLATOR_NOT_FOUND], req.language))
        }
        if (translator.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.TRANSLATOR_NOT_ACTIVE], req.language))
        }

        await db.translatorModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetTranslators(req, res, next)
}

async function DeleteTranslator(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.translatorId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.TRANSLATORID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_TRANSLATORID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const translator = db.translatorModel.findOne({ where: { Uuid: Uuid } })
        if (!translator) {
            return next(createNotfounderror([messages.ERROR.TRANSLATOR_NOT_FOUND], req.language))
        }
        if (translator.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.TRANSLATOR_NOT_ACTIVE], req.language))
        }

        await db.translatorModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetTranslators(req, res, next)
}

module.exports = {
    GetTranslators,
    GetTranslator,
    AddTranslator,
    UpdateTranslator,
    DeleteTranslator,
}