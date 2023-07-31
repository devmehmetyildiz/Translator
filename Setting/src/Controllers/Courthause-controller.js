const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetCourthauses(req, res, next) {
    try {
        const courhausies = await db.courthauseModel.findAll({ where: { Isactive: true } })
        res.status(200).json(courhausies)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetCourthausescount(req, res, next) {
    try {
        const courhausies = await db.courthauseModel.count()
        res.status(200).json(courhausies)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetCourthause(req, res, next) {

    let validationErrors = []
    if (!req.params.courthauseId) {
        validationErrors.push(messages.VALIDATION_ERROR.COURTHAUSEID_REQUIRED)
    }
    if (!validator.isUUID(req.params.courthauseId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTHAUSEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const courthause = await db.courthauseModel.findOne({ where: { Uuid: req.params.courthauseId } });
        if (!courthause) {
            return next(createNotfounderror([messages.ERROR.COURTHAUSE_NOT_FOUND]))
        }
        if (!courthause.Isactive) {
            return next(createNotfounderror([messages.ERROR.COURTHAUSE_NOT_ACTIVE]))
        }
        res.status(200).json(courthause)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddCourthause(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Isdefaultdirective,
        Isdefaultprincible
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let courthauseuuid = uuid()

    const t = await db.sequelize.transaction();

    try {

        if (Isdefaultdirective || Isdefaultprincible) {
            const courthauses = await db.courthauseModel.findAll({ where: { Isactive: true } })
            for (const courthause of courthauses) {
                await db.courthauseModel.update({
                    ...courthause,
                    Isdefaultdirective: Isdefaultdirective ? false : courthause.Isdefaultdirective,
                    Isdefaultprincible: Isdefaultprincible ? false : courthause.Isdefaultprincible,
                    Updateduser: "System",
                    Updatetime: new Date(),
                }, { where: { Uuid: courthause.Uuid } }, { transaction: t })
            }
        }

        await db.courthauseModel.create({
            ...req.body,
            Uuid: courthauseuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetCourthauses(req, res, next)
}

async function AddArrayCourthause(req, res, next) {
    let validationErrors = []
    if (Array.isArray(req.body)) {
        const t = await db.sequelize.transaction();
        try {
            for (const data of req.body) {
                const {
                    Name,
                    Isdefaultdirective,
                    Isdefaultprincible
                } = data

                if (!validator.isString(Name)) {
                    validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
                }

                if (validationErrors.length > 0) {
                    return next(createValidationError(validationErrors, req.language))
                }

                if (Isdefaultdirective || Isdefaultprincible) {
                    const courthauses = await db.courthauseModel.findAll({ where: { Isactive: true } })
                    for (const courthause of courthauses) {
                        await db.courthauseModel.update({
                            ...courthause,
                            Isdefaultdirective: Isdefaultdirective ? false : courthause.Isdefaultdirective,
                            Isdefaultprincible: Isdefaultprincible ? false : courthause.Isdefaultprincible,
                            Updateduser: "System",
                            Updatetime: new Date(),
                        }, { where: { Uuid: courthause.Uuid } }, { transaction: t })
                    }
                }

                let courthauseuuid = uuid()
                await db.courthauseModel.create({
                    ...data,
                    Uuid: courthauseuuid,
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
    GetCourthauses(req, res, next)
}

async function UpdateCourthause(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Uuid,
        Isdefaultdirective,
        Isdefaultprincible
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.COURTHAUSEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTHAUSEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const courthause = db.courthauseModel.findOne({ where: { Uuid: Uuid } })
        if (!courthause) {
            return next(createNotfounderror([messages.ERROR.COURTHAUSE_NOT_FOUND], req.language))
        }
        if (courthause.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.COURTHAUSE_NOT_ACTIVE], req.language))
        }

        if (Isdefaultdirective || Isdefaultprincible) {
            const allcourthauses = await db.courthauseModel.findAll({ where: { Isactive: true } })
            for (const courthausedata of allcourthauses) {
                await db.courthauseModel.update({
                    ...courthausedata,
                    Isdefaultdirective: Isdefaultdirective ? false : courthausedata.Isdefaultdirective,
                    Isdefaultprincible: Isdefaultprincible ? false : courthausedata.Isdefaultprincible,
                    Updateduser: "System",
                    Updatetime: new Date(),
                }, { where: { Uuid: courthausedata.Uuid } }, { transaction: t })
            }
        }

        await db.courthauseModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetCourthauses(req, res, next)
}

async function DeleteCourthause(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.courthauseId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.COURTHAUSEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_COURTHAUSEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const courthause = db.courthauseModel.findOne({ where: { Uuid: Uuid } })
        if (!courthause) {
            return next(createNotfounderror([messages.ERROR.COURTHAUSE_NOT_FOUND], req.language))
        }
        if (courthause.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.COURTHAUSE_NOT_ACTIVE], req.language))
        }

        await db.courthauseModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetCourthauses(req, res, next)
}

module.exports = {
    GetCourthauses,
    GetCourthause,
    AddCourthause,
    AddArrayCourthause,
    UpdateCourthause,
    DeleteCourthause,
    GetCourthausescount
}