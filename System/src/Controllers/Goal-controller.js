const messages = require("../Constants/Messages")
const { sequelizeErrorCatcher, createAccessDenied } = require("../Utilities/Error")
const createValidationError = require("../Utilities/Error").createValidation
const createNotfounderror = require("../Utilities/Error").createNotfounderror
const validator = require("../Utilities/Validator")
const uuid = require('uuid').v4


async function GetGoals(req, res, next) {
    try {
        const goals = await db.goalModel.findAll()
        res.status(200).json(goals)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetGoalscount(req, res, next) {
    try {
        const goals = await db.goalModel.count()
        res.status(200).json(goals)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function GetGoal(req, res, next) {

    let validationErrors = []
    if (!req.params.goalId) {
        validationErrors.push(messages.VALIDATION_ERROR.GOALID_REQUIRED)
    }
    if (!validator.isUUID(req.params.goalId)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_GOALID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    try {
        const goal = await db.goalModel.findOne({ where: { Uuid: req.params.goalId } });
        if (!goal) {
            return createNotfounderror([messages.ERROR.GOAL_NOT_FOUND])
        }
        if (!goal.Isactive) {
            return createNotfounderror([messages.ERROR.GOAL_NOT_ACTIVE])
        }
        res.status(200).json(goal)
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}



async function AddGoal(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Goal,
        Isgeneralgoal,
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Goal)) {
        validationErrors.push(messages.VALIDATION_ERROR.GOAL_REQUIRED)
    }

    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    let goaluuid = uuid()

    const t = await db.sequelize.transaction();

    try {

        if (Isgeneralgoal) {
            const goals = await db.goalModel.findAll({ where: { Isactive: true } })
            for (const goal of goals) {
                await db.goalModel.update({
                    ...goal,
                    Isgeneralgoal: Isgeneralgoal ? false : goal.Isgeneralgoal,
                    Updateduser: "System",
                    Updatetime: new Date(),
                }, { where: { Uuid: goal.Uuid } }, { transaction: t })
            }
        }

        await db.goalModel.create({
            ...req.body,
            Uuid: goaluuid,
            Createduser: "System",
            Createtime: new Date(),
            Isactive: true
        }, { transaction: t })
        await t.commit()
    } catch (err) {
        await t.rollback()
        return next(sequelizeErrorCatcher(err))
    }
    GetGoals(req, res, next)
}

async function AddArrayGoal(req, res, next) {
    let validationErrors = []
    if (Array.isArray(req.body)) {
        const t = await db.sequelize.transaction();
        try {
            for (const data of req.body) {
                const {
                    Name,
                    Goal,
                    Isgeneralgoal
                } = data

                if (!validator.isString(Name)) {
                    validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
                }
                if (!validator.isNumber(Goal)) {
                    validationErrors.push(messages.VALIDATION_ERROR.GOAL_REQUIRED)
                }

                if (validationErrors.length > 0) {
                    return next(createValidationError(validationErrors, req.language))
                }

                if (Isgeneralgoal) {
                    const goals = await db.goalModel.findAll({ where: { Isactive: true } })
                    for (const goal of goals) {
                        await db.goalModel.update({
                            ...goal,
                            Isgeneralgoal: Isgeneralgoal ? false : goal.Isgeneralgoal,
                            Updateduser: "System",
                            Updatetime: new Date(),
                        }, { where: { Uuid: goal.Uuid } }, { transaction: t })
                    }
                }

                let goaluuid = uuid()
                await db.goalModel.create({
                    ...data,
                    Uuid: goaluuid,
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
    GetGoals(req, res, next)
}

async function UpdateGoal(req, res, next) {

    let validationErrors = []
    const {
        Name,
        Goal,
        Uuid,
        Isgeneralgoal
    } = req.body

    if (!validator.isString(Name)) {
        validationErrors.push(messages.VALIDATION_ERROR.NAME_REQUIRED)
    }
    if (!validator.isNumber(Goal)) {
        validationErrors.push(messages.VALIDATION_ERROR.GOAL_REQUIRED)
    }
    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.GOALID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_GOALID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {

        const goal = db.goalModel.findOne({ where: { Uuid: Uuid } })
        if (!goal) {
            return next(createNotfounderror([messages.ERROR.GOAL_NOT_FOUND], req.language))
        }
        if (goal.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.GOAL_NOT_ACTIVE], req.language))
        }
        if (Isgeneralgoal) {
            const allgoals = await db.goalModel.findAll({ where: { Isactive: true } })
            for (const goaldata of allgoals) {
                await db.goalModel.update({
                    ...goaldata,
                    Isgeneralgoal: Isgeneralgoal ? false : goaldata.Isgeneralgoal,
                    Updateduser: "System",
                    Updatetime: new Date(),
                }, { where: { Uuid: goaldata.Uuid } }, { transaction: t })
            }
        }

        await db.goalModel.update({
            ...req.body,
            Updateduser: "System",
            Updatetime: new Date(),
        }, { where: { Uuid: Uuid } }, { transaction: t })

        await t.commit()
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
    GetGoals(req, res, next)
}

async function DeleteGoal(req, res, next) {

    let validationErrors = []
    const Uuid = req.params.goalId

    if (!Uuid) {
        validationErrors.push(messages.VALIDATION_ERROR.GOALID_REQUIRED)
    }
    if (!validator.isUUID(Uuid)) {
        validationErrors.push(messages.VALIDATION_ERROR.UNSUPPORTED_GOALID)
    }
    if (validationErrors.length > 0) {
        return next(createValidationError(validationErrors, req.language))
    }

    const t = await db.sequelize.transaction();
    try {
        const goal = db.goalModel.findOne({ where: { Uuid: Uuid } })
        if (!goal) {
            return next(createNotfounderror([messages.ERROR.GOAL_NOT_FOUND], req.language))
        }
        if (goal.Isactive === false) {
            return next(createAccessDenied([messages.ERROR.GOAL_NOT_ACTIVE], req.language))
        }

        //await db.goalModel.destroy({ where: { Uuid: Uuid }, transaction: t });
        await db.goalModel.update({
            Updateduser: "System",
            Updatetime: new Date(),
            Isactive: false
        }, { where: { Uuid: Uuid } }, { transaction: t })
        await t.commit();
    } catch (error) {
        await t.rollback();
        return next(sequelizeErrorCatcher(error))
    }
    GetGoals(req, res, next)
}

module.exports = {
    GetGoals,
    GetGoal,
    AddGoal,
    AddArrayGoal,
    UpdateGoal,
    DeleteGoal,
    GetGoalscount
}