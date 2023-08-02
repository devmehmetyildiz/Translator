const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetCases(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('casescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Screen', req.language, { en: 'Show Cases', tr: 'Durum Kayıtlarını Görüntüleme' }))
    }
}

async function GetCasescount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('casescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Screen', req.language, { en: 'Show Cases', tr: 'Durum Kayıtlarını Görüntüleme' }))
    }
}

async function GetCompleteCase(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('casescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Screen', req.language, { en: 'Show Cases', tr: 'Durum Kayıtlarını Görüntüleme' }))
    }
}

async function GetDeactivateCase(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('casescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Screen', req.language, { en: 'Show Cases', tr: 'Durum Kayıtlarını Görüntüleme' }))
    }
}

async function GetCase(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('casescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Screen', req.language, { en: 'Show Cases', tr: 'Durum Kayıtlarını Görüntüleme' }))
    }
}

async function AddCase(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('caseadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Add', req.language, { en: 'Case Add', tr: 'Durum Kayıt Ekleme' }))
    }
}

async function AddArrayCase(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('caseadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Add', req.language, { en: 'Case Add', tr: 'Durum Kayıt Ekleme' }))
    }
}

async function UpdateCase(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('caseupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Update', req.language, { en: 'Case Update', tr: 'Durum Kayıt Güncelleme' }))
    }
}

async function DeleteCase(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('casedelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Cases Delete', req.language, { en: 'Case Delete', tr: 'Durum Kayıt Silme' }))
    }
}

module.exports = {
    GetCases,
    GetCase,
    AddCase,
    AddArrayCase,
    UpdateCase,
    DeleteCase,
    GetCompleteCase,
    GetDeactivateCase,
    GetCasescount
}