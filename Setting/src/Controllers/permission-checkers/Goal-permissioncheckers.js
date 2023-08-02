const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetGoals(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('goalscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Goals Screen', req.language, { en: 'Show Goals', tr: 'Hedefleri Görüntüleme' }))
    }
}

async function GetGoalscount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('goalscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Goals Screen', req.language, { en: 'Show Goals', tr: 'Hedefleri Görüntüleme' }))
    }
}

async function GetGoal(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('goalscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Goals Screen', req.language, { en: 'Show Goals', tr: 'Hedefleri Görüntüleme' }))
    }
}

async function AddGoal(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('goaladd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Goals Add', req.language, { en: 'Goal Add', tr: 'Hedef Ekleme' }))
    }
}

async function AddArrayGoal(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('goaladd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Goals Add', req.language, { en: 'Goal Add', tr: 'Hedef Ekleme' }))
    }
}

async function UpdateGoal(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('goalupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Goals Update', req.language, { en: 'Goal Update', tr: 'Hedef Güncelleme' }))
    }
}

async function DeleteGoal(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('goaldelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Goals Delete', req.language, { en: 'Goal Delete', tr: 'Hedef Silme' }))
    }
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