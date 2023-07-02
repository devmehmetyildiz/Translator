const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetCases(req, res, next) {
    try {
        const cases = await db.caseModel.findAll({ where: { Isactive: true } })
        for (const casedata of cases) {
            let departmentuuids = await db.casedepartmentModel.findAll({
                where: {
                    CaseID: casedata.Uuid,
                }
            });
            casedata.Departments = await db.departmentModel.findAll({
                where: {
                    Uuid: departmentuuids.map(u => { return u.DepartmentID })
                }
            })
        }
        res.status(200).json(cases)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetCompleteCase(req, res, next) {

    try {
        const casedata = await db.caseModel.findOne({ where: { CaseStatus: 1 } });
        if (!casedata) {
            return next(createNotfounderror([messages.ERROR.CASE_NOT_FOUND], req.language))
        }
        if (!casedata.Isactive) {
            return createNotfounderror([messages.ERROR.CASE_NOT_ACTIVE])
        }
        let departmentuuids = await db.casedepartmentModel.findAll({
            where: {
                CaseID: casedata.Uuid,
            }
        });
        casedata.Departments = await db.departmentModel.findAll({
            where: {
                Uuid: departmentuuids.map(u => { return u.DepartmentID })
            }
        })
        res.status(200).json(casedata)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetDeactivateCase(req, res, next) {

    try {
        const casedata = await db.caseModel.findOne({ where: { CaseStatus: -1 } });
        if (!casedata) {
            return next(createNotfounderror([messages.ERROR.CASE_NOT_FOUND], req.language))
        }
        if (!casedata.Isactive) {
            return createNotfounderror([messages.ERROR.CASE_NOT_ACTIVE])
        }
        let departmentuuids = await db.casedepartmentModel.findAll({
            where: {
                CaseID: casedata.Uuid,
            }
        });
        casedata.Departments = await db.departmentModel.findAll({
            where: {
                Uuid: departmentuuids.map(u => { return u.DepartmentID })
            }
        })
        res.status(200).json(casedata)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetCase(req, res, next) {

    let validationErrors = []
    if (!req.params.caseId) {
        validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
    }
    if (!validator.isUUID(req.params.caseId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_CASEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const casedata = await db.caseModel.findOne({ where: { Uuid: req.params.caseId } });
        if (!casedata) {
            return createNotfounderror([messages.ERROR.CASE_NOT_FOUND])
        }
        if (!casedata.Isactive) {
            return createNotfounderror([messages.ERROR.CASE_NOT_ACTIVE])
        }
        let departmentuuids = await db.casedepartmentModel.findAll({
            where: {
                CaseID: casedata.Uuid,
            }
        });
        casedata.Departments = await db.departmentModel.findAll({
            where: {
                Uuid: departmentuuids.map(u => { return u.DepartmentID })
            }
        })
        res.status(200).json(casedata)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddCase(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Shortname,
        Casecolor,
        CaseStatus,
        Departments,
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isString(Shortname)) {
        validationErrors.push(messages.VALIDATION_ERROR.SHORTNAME_REQUIRED)
    }
    if (!validator.isString(Casecolor)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(CaseStatus)) {
        validationErrors.push(messages.VALIDATION_ERROR.CASECOLOR_REQUIRED)
    }
    if (!validator.isArray(Departments)) {
        validationErrors.push(messages.VALIDATION_ERROR.DEPARTMENTS_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let caseuuid = uuid()

    const t = await db.sequelize.transaction();

    try {
        await db.caseModel.create({
            ...req.body,
            Uuid: caseuuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })

        for (const department of Departments) {
            if (!department.Uuid || !validator.isUUID(department.Uuid)) {
                return next(createValidationError(messages.VALIDATION_ERROR.UNSUPPORTED_DEPARTMENTID, req.language))
            }
            await db.casedepartmentModel.create({
                CaseID: caseuuid,
                DepartmentID: department.Uuid
            }, { transaction: t });
        }

        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetCases(req, res, next)
}

async function UpdateCase(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Shortname,
        Casecolor,
        CaseStatus,
        Departments,
        Uuid
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isString(Shortname)) {
        validationErrors.push(messages.VALIDATION_ERROR.SHORTNAME_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_CASEID)
    }
    if (!validator.isString(Casecolor)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(CaseStatus)) {
        validationErrors.push(messages.VALIDATION_ERROR.CASECOLOR_REQUIRED)
    }
    if (!validator.isArray(Departments)) {
        validationErrors.push(messages.VALIDATION_ERROR.DEPARTMENTS_REQUIRED)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const casedata = db.caseModel.findOne({ where: { Uuid: Uuid } })
        if (!casedata) {
            return next(createNotfounderror([messages.ERROR.CASE_NOT_FOUND], req.language))
        }
        if (casedata.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.CASE_NOT_ACTIVE], req.language))
        }

        await db.caseModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await db.casedepartmentModel.destroy({ where: { CaseID: Uuid }, transaction: t });
        for (const department of Departments) {
            if (!department.Uuid || !validator.isUUID(department.Uuid)) {
                return next(createValidationError(messages.VALIDATION_ERROR.UNSUPPORTED_DEPARTMENTID, req.language))
            }
            await db.casedepartmentModel.create({
                CaseID: Uuid,
                DepartmentID: department.Uuid
            }, { transaction: t });
        }
        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetCases(req, res, next)
}

async function DeleteCase(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.caseId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.CASEID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_CASEID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const casedata = db.caseModel.findOne({ where: { Uuid: Uuid } })
        if (!casedata) {
            return next(createNotfounderror([messages.ERROR.CASE_NOT_FOUND], req.language))
        }
        if (casedata.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.CASE_NOT_ACTIVE], req.language))
        }

        await db.casedepartmentModel.destroy({ where: { CaseID: Uuid }, transaction: t });
        await db.caseModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetCases(req, res, next)
}

module.exports = {
    GetCases,
    GetCase,
    AddCase,
    UpdateCase,
    DeleteCase,
    GetCompleteCase,
    GetDeactivateCase
}