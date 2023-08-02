const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetGoals(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('goalscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function GetGoalscount(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('goalscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function GetGoal(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('goalscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function AddGoal(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('goaladd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function AddArrayGoal(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('goaladd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function UpdateGoal(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('goalupdate') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function DeleteGoal(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('goaldelete') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
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