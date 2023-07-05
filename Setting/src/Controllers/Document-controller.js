const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetDocuments(req, res, next) {
    try {
        const documents = await db.documentModel.findAll({ where: { Isactive: true } })
        res.status(200).json(documents)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetDocument(req, res, next) {

    let validationErrors = []
    if (!req.params.documentId) {
        validationErrors.push(messages.VALIDATION_ERROR.DOCUMENTID_REQUIRED)
    }
    if (!validator.isUUID(req.params.documentId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DOCUMENTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const document = await db.documentModel.findOne({ where: { Uuid: req.params.documentId } });
        if (!document) {
            return createNotfounderror([messages.ERROR.DOCUMENT_NOT_FOUND])
        }
        if (!document.Isactive) {
            return createNotfounderror([messages.ERROR.DOCUMENT_NOT_ACTIVE])
        }
        res.status(200).json(document)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddDocument(req, res, next) {

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

    let documentuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.documentModel.create({
            ...req.body,
            Uuid: documentuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetDocuments(req, res, next)
}

async function UpdateDocument(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Uuid
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.DOCUMENTID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DOCUMENTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const document = db.documentModel.findOne({ where: { Uuid: Uuid } })
        if (!document) {
            return next(createNotfounderror([messages.ERROR.DOCUMENT_NOT_FOUND], req.language))
        }
        if (document.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.DOCUMENT_NOT_ACTIVE], req.language))
        }

        await db.documentModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetDocuments(req, res, next)
}

async function DeleteDocument(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.documentId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.DOCUMENTID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DOCUMENTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const document = db.documentModel.findOne({ where: { Uuid: Uuid } })
        if (!document) {
            return next(createNotfounderror([messages.ERROR.DOCUMENT_NOT_FOUND], req.language))
        }
        if (document.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.DOCUMENT_NOT_ACTIVE], req.language))
        }

        await db.documentModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetDocuments(req, res, next)
}

module.exports = {
    GetDocuments,
    GetDocument,
    AddDocument,
    UpdateDocument,
    DeleteDocument,
}