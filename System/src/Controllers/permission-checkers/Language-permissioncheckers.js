const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetLanguages(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languagescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Languages Screen', req.language, { en: 'Show Languages', tr: 'Dil Kaydı Görüntüleme' }))
    }
}

async function GetLanguagescount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languagescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Languages Screen', req.language, { en: 'Show Languages', tr: 'Dil Kaydı Görüntüleme' }))
    }
}

async function GetLanguage(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languagescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Languages Screen', req.language, { en: 'Show Languages', tr: 'Dil Kaydı Görüntüleme' }))
    }
}

async function GetLanguageconfig(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languagescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Languages Screen', req.language, { en: 'Show Languages', tr: 'Dil Kayıtları Görüntüleme' }))
    }
}

async function UpdateLanguageconfig(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languagecanchangecalculatesetting')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Language Can Edit Setting', req.language, { en: 'Language Calculate Setting Update', tr: 'Dil Hesap Ayarı Güncelleme ' }))
    }
}

async function AddLanguage(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languageadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Languages Add', req.language, { en: 'Language Add', tr: 'Dil Kaydı Ekleme' }))
    }
}

async function AddArrayLanguage(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languageadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Languages Add', req.language, { en: 'Language Add', tr: 'Dil Kaydı Ekleme' }))
    }
}

async function UpdateLanguage(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languageupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Languages Update', req.language, { en: 'Language Update', tr: 'Dil Kaydı Güncelleme' }))
    }
}

async function DeleteLanguage(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('languagedelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Languages Delete', req.language, { en: 'Language Delete', tr: 'Dil Kaydı Silme' }))
    }
}

module.exports = {
    GetLanguages,
    GetLanguage,
    AddLanguage,
    AddArrayLanguage,
    UpdateLanguage,
    DeleteLanguage,
    GetLanguageconfig,
    UpdateLanguageconfig,
    GetLanguagescount
}