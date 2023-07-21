const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetDefinedcostumers(req, res, next) {
    try {
        const definedcostumers = await db.definedcostumerModel.findAll({ where: { Isactive: true } })
        res.status(200).json(definedcostumers)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetDefinedcostumerscount(req, res, next) {
    try {
        const definedcostumers = await db.definedcostumerModel.count()
        res.status(200).json(definedcostumers)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetDefinedcostumer(req, res, next) {

    let validationErrors = []
    if (!req.params.definedcostumerId) {
        validationErrors.push(messages.VALIDATION_ERROR.DEFINEDCOSTUMERID_REQUIRED)
    }
    if (!validator.isUUID(req.params.definedcostumerId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DEFINEDCOSTUMERID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const definedcostumer = await db.definedcostumerModel.findOne({ where: { Uuid: req.params.definedcostumerId } });
        if (!definedcostumer) {
            return next(createNotfounderror([messages.ERROR.DEFINEDCOSTUMER_NOT_FOUND]))
        }
        if (!definedcostumer.Isactive) {
            return next(createNotfounderror([messages.ERROR.DEFINEDCOSTUMER_NOT_ACTIVE]))
        }
        res.status(200).json(definedcostumer)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddDefinedcostumer(req, res, next) {

    let validationErrors = []
    const {
        Name,
        CountryID,
        Phone,
        Email,
        City,
        Town,
        Address,
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isString(CountryID)) {
        validationErrors.push(messages.VALIDATION_ERROR.COUNTRYID_REQUIRED)
    }
    if (!validator.isString(Phone)) {
        validationErrors.push(messages.VALIDATION_ERROR.PHONE_REQUIRED)
    }
    if (!validator.isString(Email)) {
        validationErrors.push(messages.VALIDATION_ERROR.EMAIL_REQUIRED)
    }
    if (!validator.isString(City)) {
        validationErrors.push(messages.VALIDATION_ERROR.CITY_REQUIRED)
    }
    if (!validator.isString(Town)) {
        validationErrors.push(messages.VALIDATION_ERROR.TOWN_REQUIRED)
    }
    if (!validator.isString(Address)) {
        validationErrors.push(messages.VALIDATION_ERROR.ADDRESS_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let definedcostumerId = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.definedcostumerModel.create({
            ...req.body,
            Uuid: definedcostumerId,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetDefinedcostumers(req, res, next)
}

async function AddArrayDefinedcostumer(req, res, next) {
    let validationErrors = []
    if (Array.isArray(req.body)) {
        try {
            const t = await db.sequelize.transaction();
            for (const data of req.body) {
                const {
                    Name,
                    CountryID,
                    Phone,
                    Email,
                    City,
                    Town,
                    Address,
                } = data

                if (!validator.isString(Name)) {
                    validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
                }
                if (!validator.isString(CountryID)) {
                    validationErrors.push(messages.VALIDATION_ERROR.COUNTRYID_REQUIRED)
                }
                if (!validator.isString(Phone)) {
                    validationErrors.push(messages.VALIDATION_ERROR.PHONE_REQUIRED)
                }
                if (!validator.isString(Email)) {
                    validationErrors.push(messages.VALIDATION_ERROR.EMAIL_REQUIRED)
                }
                if (!validator.isString(City)) {
                    validationErrors.push(messages.VALIDATION_ERROR.CITY_REQUIRED)
                }
                if (!validator.isString(Town)) {
                    validationErrors.push(messages.VALIDATION_ERROR.TOWN_REQUIRED)
                }
                if (!validator.isString(Address)) {
                    validationErrors.push(messages.VALIDATION_ERROR.ADDRESS_REQUIRED)
                }

                if (validationErrors.length > 0) {
                    return next(createValidationError(validationErrors, req.language))
                }

                let definedcostumerId = uuid()
                await db.definedcostumerModel.create({
                    ...data,
                    Uuid: definedcostumerId,
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
    GetDefinedcostumers(req, res, next)
}

async function UpdateDefinedcostumer(req, res, next) {

    let validationErrors = []
    const {
        Uuid,
        Name,
        CountryID,
        Phone,
        Email,
        City,
        Town,
        Address,
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isString(CountryID)) {
        validationErrors.push(messages.VALIDATION_ERROR.COUNTRYID_REQUIRED)
    }
    if (!validator.isString(Phone)) {
        validationErrors.push(messages.VALIDATION_ERROR.PHONE_REQUIRED)
    }
    if (!validator.isString(Email)) {
        validationErrors.push(messages.VALIDATION_ERROR.EMAIL_REQUIRED)
    }
    if (!validator.isString(City)) {
        validationErrors.push(messages.VALIDATION_ERROR.CITY_REQUIRED)
    }
    if (!validator.isString(Town)) {
        validationErrors.push(messages.VALIDATION_ERROR.TOWN_REQUIRED)
    }
    if (!validator.isString(Address)) {
        validationErrors.push(messages.VALIDATION_ERROR.ADDRESS_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.DEFINEDCOSTUMERID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DEFINEDCOSTUMERID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const definedcostumer = db.definedcostumerModel.findOne({ where: { Uuid: Uuid } })
        if (!definedcostumer) {
            return next(createNotfounderror([messages.ERROR.DEFINEDCOSTUMER_NOT_FOUND], req.language))
        }
        if (definedcostumer.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.DEFINEDCOSTUMER_NOT_ACTIVE], req.language))
        }

        await db.definedcostumerModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetDefinedcostumers(req, res, next)
}

async function DeleteDefinedcostumer(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.definedcostumerId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.DEFINEDCOSTUMERID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_DEFINEDCOSTUMERID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const definedcostumer = db.definedcostumerModel.findOne({ where: { Uuid: Uuid } })
        if (!definedcostumer) {
            return next(createNotfounderror([messages.ERROR.DEFINEDCOSTUMER_NOT_FOUND], req.language))
        }
        if (definedcostumer.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.DEFINEDCOSTUMER_NOT_ACTIVE], req.language))
        }

        await db.definedcostumerModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetDefinedcostumers(req, res, next)
}

module.exports = {
    GetDefinedcostumers,
    GetDefinedcostumer,
    AddDefinedcostumer,
    AddArrayDefinedcostumer,
    UpdateDefinedcostumer,
    DeleteDefinedcostumer,
    GetDefinedcostumerscount
}