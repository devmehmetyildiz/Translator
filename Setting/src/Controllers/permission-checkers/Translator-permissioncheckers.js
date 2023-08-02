const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetTranslators(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('translatorscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Translators Screen', req.language, { en: 'Show Translators', tr: 'Çevirmen Kayıtlarını Görüntüleme' }))
    }
}

async function GetTranslatorscount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('translatorscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Translators Screen', req.language, { en: 'Show Translators', tr: 'Çevirmen Kayıtlarını Görüntüleme' }))
    }
}

async function GetTranslator(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('translatorscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Translators Screen', req.language, { en: 'Show Translators', tr: 'Çevirmen Kayıtlarını Görüntüleme' }))
    }
}

async function AddTranslator(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('translatoradd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Translators Add', req.language, { en: 'Translator Add', tr: 'Çevirmen Ekleme' }))
    }
}

async function AddArrayTranslator(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('translatoradd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Translators Add', req.language, { en: 'Translator Add', tr: 'Çevirmen Ekleme' }))
    }
}

async function UpdateTranslator(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('translatorupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Translators Update', req.language, { en: 'Translator Update', tr: 'Çevirmen Ekleme' }))
    }
}

async function DeleteTranslator(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('translatordelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Translators Delete', req.language, { en: 'Translator Delete', tr: 'Çevirmen Silme' }))
    }
}

module.exports = {
    GetTranslators,
    GetTranslator,
    AddTranslator,
    AddArrayTranslator,
    UpdateTranslator,
    DeleteTranslator,
    GetTranslatorscount
}