const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetCourthauses(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('courthausescreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Courthauses Screen', req.language, { en: 'Show Courthauses', tr: 'Adliye Kayıtlarını Görüntüleme' }))
    }
}

async function GetCourthausescount(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('courthausescreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Courthauses Screen', req.language, { en: 'Show Courthauses', tr: 'Adliye Kayıtlarını Görüntüleme' }))
    }
}

async function GetCourthause(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('courthausescreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Courthauses Screen', req.language, { en: 'Show Courthauses', tr: 'Adliye Kayıtlarını Görüntüleme' }))
    }
}

async function AddCourthause(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('courthauseadd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Courthauses Add', req.language, { en: 'Courthause Add', tr: 'Adliye Kayıt Ekleme' }))
    }
}

async function AddArrayCourthause(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('courthauseadd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Courthauses Add', req.language, { en: 'Courthause Add', tr: 'Adliye Kayıt Ekleme' }))
    }
}

async function UpdateCourthause(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('courthauseupdate') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Courthauses Update', req.language, { en: 'Courthause Update', tr: 'Adliye Kayıt Güncelleme' }))
    }
}

async function DeleteCourthause(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('courthausedelete') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Courthauses Delete', req.language, { en: 'Courthause Delete', tr: 'Adliye Kayıt Silme' }))
    }
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