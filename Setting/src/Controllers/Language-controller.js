const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetLanguages(req, res, next) {
    try {
        const languages = await db.languageModel.findAll({ where: { Isactive: true } })
        for (const language of languages) {
            language.Kdv = await db.kdvModel.findOne({ where: { Uuid: language.KdvID } })
        }
        res.status(200).json(languages)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetLanguage(req, res, next) {

    let validationErrors = []
    if (!req.params.languageId) {
        validationErrors.push(messages.VALIDATION_ERROR.LANGUAGEID_REQUIRED)
    }
    if (!validator.isUUID(req.params.languageId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_LANGUAGEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const language = await db.languageModel.findOne({ where: { Uuid: req.params.languageId } });
        if (!language) {
            return createNotfounderror([messages.ERROR.LANGUAGE_NOT_FOUND])
        }
        if (!language.Isactive) {
            return createNotfounderror([messages.ERROR.LANGUAGE_NOT_ACTIVE])
        }
        language.Kdv = await db.kdvModel.findOne({ where: { Uuid: language.KdvID } })
        res.status(200).json(language)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetLanguageconfig(req, res, next) {
    try {
        const configs = await db.languageconfigModel.findAll({ where: { Isactive: true } })
        if (!configs || !Array.isArray(configs) || configs.length <= 0) {
            return next(createNotfounderror([messages.ERROR.LANGUAGECONFIG_NOT_FOUND]))
        }
        const config = configs[0]
        if (!config.Isactive) {
            return next(createNotfounderror([messages.ERROR.LANGUAGECONFIG_NOT_ACTIVE]))
        }
        res.status(200).json(config)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function UpdateLanguageconfig(req, res, next) {

    let validationErrors = []
    const {
        Wordcount,
        Linecount,
        Charcount,
        Uuid
    } = req.body

    if (!validator.isNumber(Wordcount)) {
        validationErrors.push(messages.VALIDATION_ERROR.WORDMAXCOUNT_REQUIRED)
    }
    if (!validator.isNumber(Linecount)) {
        validationErrors.push(messages.VALIDATION_ERROR.LINEMAXCOUNT_REQUIRED)
    }
    if (!validator.isNumber(Charcount)) {
        validationErrors.push(messages.VALIDATION_ERROR.CHARMAXCOUNT_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }


    const t = await db.sequelize.transaction();

    try {
        let isnewRecord = false
        if (!validator.isUUID(Uuid)) {
            isnewRecord = true
        }
        if (!isnewRecord) {
            const config = await db.languageconfigModel.findOne({ where: { Uuid: Uuid, Isactive: true } })
            if (!config) {
                isnewRecord = true
            }
            if (!config.Isactive) {
                isnewRecord = true
            }
        }

        if (isnewRecord) {
            let languageconfiguuid = uuid()
            await db.languageconfigModel.create({
                ...req.body,
                Uuid: languageconfiguuid,
                Createduser: "System",
                Createtime: new Date(),
                Isactive: true
            }, { transaction: t })
        } else {
            await db.languageconfigModel.update({
                ...req.body,
                Updateduser: "System",
                Updatetime: new Date(),
                Isactive: true
            }, { where: { Uuid: Uuid } }, { transaction: t })
        }

        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetLanguages(req, res, next)
}


async function AddLanguage(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Price,
        KdvID,
        Discount
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Price)) {
        validationErrors.push(messages.VALIDATION_ERROR.PRICE_REQUIRED)
    }
    if (!validator.isUUID(KdvID)) {
        validationErrors.push(messages.VALIDATION_ERROR.KDVID_REQUIRED)
    }
    if (!validator.isNumber(Discount)) {
        validationErrors.push(messages.VALIDATION_ERROR.DISCOUNT_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let languageuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.languageModel.create({
            ...req.body,
            Uuid: languageuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetLanguages(req, res, next)
}

async function UpdateLanguage(req, res, next) {

    let validationErrors = []
    const {
        Uuid,
        Name,
        Price,
        KdvID,
        Discount
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Price)) {
        validationErrors.push(messages.VALIDATION_ERROR.PRICE_REQUIRED)
    }
    if (!validator.isUUID(KdvID)) {
        validationErrors.push(messages.VALIDATION_ERROR.KDVID_REQUIRED)
    }
    if (!validator.isNumber(Discount)) {
        validationErrors.push(messages.VALIDATION_ERROR.DISCOUNT_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.LANGUAGEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_LANGUAGEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const language = db.languageModel.findOne({ where: { Uuid: Uuid } })
        if (!language) {
            return next(createNotfounderror([messages.ERROR.LANGUAGE_NOT_FOUND], req.language))
        }
        if (language.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.LANGUAGE_NOT_ACTIVE], req.language))
        }

        await db.languageModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetLanguages(req, res, next)
}

async function DeleteLanguage(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.languageId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.LANGUAGEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_LANGUAGEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const language = db.languageModel.findOne({ where: { Uuid: Uuid } })
        if (!language) {
            return next(createNotfounderror([messages.ERROR.LANGUAGE_NOT_FOUND], req.language))
        }
        if (language.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.LANGUAGE_NOT_ACTIVE], req.language))
        }

        await db.languageModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetLanguages(req, res, next)
}

module.exports = {
    GetLanguages,
    GetLanguage,
    AddLanguage,
    UpdateLanguage,
    DeleteLanguage,
    GetLanguageconfig,
    UpdateLanguageconfig,
}