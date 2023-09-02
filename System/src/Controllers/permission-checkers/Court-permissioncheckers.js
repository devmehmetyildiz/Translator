const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetCourts(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('courtscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Courts Screen', req.language, { en: 'Show Courts', tr: 'Mahkeme Kayıtlarını Görüntüleme' }))
    }
}

async function GetCourtscount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('courtscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Courts Screen', req.language, { en: 'Show Courts', tr: 'Mahkeme Kayıtlarını Görüntüleme' }))
    }
}

async function GetCourt(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('courtscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Courts Screen', req.language, { en: 'Show Courts', tr: 'Mahkeme Kayıtlarını Görüntüleme' }))
    }
}

async function AddCourt(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('courtadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Courts Add', req.language, { en: 'Court Add', tr: 'Mahkeme Kayıt Ekleme' }))
    }
}

async function AddArrayCourt(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('courtadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Courts Add', req.language, { en: 'Court Add', tr: 'Mahkeme Kayıt Ekleme' }))
    }
}

async function UpdateCourt(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('courtupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Courts Update', req.language, { en: 'Court Update', tr: 'Mahkeme Kayıt Güncelleme' }))
    }
}

async function DeleteCourt(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('courtdelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Courts Delete', req.language, { en: 'Court Delete', tr: 'Mahkeme Kayıt Silme' }))
    }
}

module.exports = {
    GetCourts,
    GetCourt,
    AddCourt,
    AddArrayCourt,
    UpdateCourt,
    DeleteCourt,
    GetCourtscount
}