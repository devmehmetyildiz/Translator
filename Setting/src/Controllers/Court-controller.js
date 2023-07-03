const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetCourts(req, res, next) {
    try {
        const courts = await db.courtModel.findAll({ where: { Isactive: true } })
        res.status(200).json(courts)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetCourt(req, res, next) {

    let validationErrors = []
    if (!req.params.courtId) {
        validationErrors.push(messages.VALIDATION_ERROR.COURTID_REQUIRED)
    }
    if (!validator.isUUID(req.params.courtId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const court = await db.courtModel.findOne({ where: { Uuid: req.params.courtId } });
        if (!court) {
            return createNotfounderror([messages.ERROR.COURT_NOT_FOUND])
        }
        if (!court.Isactive) {
            return createNotfounderror([messages.ERROR.COURT_NOT_ACTIVE])
        }
        res.status(200).json(court)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddCourt(req, res, next) {

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

    let courtuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.courtModel.create({
            ...req.body,
            Uuid: courtuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetCourts(req, res, next)
}

async function UpdateCourt(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Uuid
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.COURTID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const court = db.courtModel.findOne({ where: { Uuid: Uuid } })
        if (!court) {
            return next(createNotfounderror([messages.ERROR.COURT_NOT_FOUND], req.language))
        }
        if (court.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.COURT_NOT_ACTIVE], req.language))
        }

        await db.courtModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetCourts(req, res, next)
}

async function DeleteCourt(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.courtId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.COURTID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const court = db.courtModel.findOne({ where: { Uuid: Uuid } })
        if (!court) {
            return next(createNotfounderror([messages.ERROR.COURT_NOT_FOUND], req.language))
        }
        if (court.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.COURT_NOT_ACTIVE], req.language))
        }

        await db.courtModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetCourts(req, res, next)
}

module.exports = {
    GetCourts,
    GetCourt,
    AddCourt,
    UpdateCourt,
    DeleteCourt,
}