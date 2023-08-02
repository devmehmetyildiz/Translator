const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetKdvs(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('kdvscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Kdvs Screen', req.language, { en: 'Show Kdvs', tr: 'Kdv Görüntüleme' }))
    }
}

async function GetKdvscount(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('kdvscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Kdvs Screen', req.language, { en: 'Show Kdvs', tr: 'Kdv Görüntüleme' }))
    }
}

async function GetKdv(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('kdvscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Kdvs Screen', req.language, { en: 'Show Kdvs', tr: 'Kdv Görüntüleme' }))
    }
}

async function AddKdv(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('kdvadd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Kdvs Screen', req.language, { en: 'Kdv Add', tr: 'Kdv Kayıt Ekleme' }))
    }
}

async function AddArrayKdv(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('kdvadd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Kdvs Add', req.language, { en: 'Kdv Add', tr: 'Kdv Kayıt Ekleme' }))
    }
}

async function UpdateKdv(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('kdvupdate') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Kdvs Update', req.language, { en: 'Kdv Update', tr: 'Kdv Kayıt Güncelleme' }))
    }
}

async function DeleteKdv(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('kdvdelete') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Kdvs Delete', req.language, { en: 'Kdv Delete', tr: 'Kdv Kayıt Silme' }))
    }
}

module.exports = {
    GetKdvs,
    GetKdv,
    AddKdv,
    AddArrayKdv,
    UpdateKdv,
    DeleteKdv,
    GetKdvscount
}