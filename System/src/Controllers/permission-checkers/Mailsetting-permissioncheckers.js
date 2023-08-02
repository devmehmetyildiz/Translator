const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetMailsettings(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('mailsettingscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Mailsettings Screen', req.language, { en: 'Show Mailsettings', tr: 'Mail Ayarları Görüntüleme' }))
    }
}

async function GetMailsettingscount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('mailsettingscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Mailsettings Screen', req.language, { en: 'Show Mailsettings', tr: 'Mail Ayarları Görüntüleme' }))
    }
}

async function GetMailsetting(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('mailsettingscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Mailsettings Screen', req.language, { en: 'Show Mailsettings', tr: 'Mail Ayarları Görüntüleme' }))
    }
}
async function GetActiveMailsetting(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('mailsettingscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Mailsettings Screen', req.language, { en: 'Show Mailsettings', tr: 'Mail Ayarları Görüntüleme' }))
    }
}

async function AddMailsetting(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('mailsettingadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Mailsettings Add', req.language, { en: 'Mailsetting Add', tr: 'Mail Ayarı Ekleme' }))
    }
}

async function UpdateMailsetting(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('mailsettingupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Mailsettings Update', req.language, { en: 'Mailsetting Update', tr: 'Mail Ayarı Güncelleme' }))
    }
}

async function DeleteMailsetting(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('mailsettingdelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Mailsettings Delete', req.language, { en: 'Mailsetting Delete', tr: 'Mail Ayarı Silme' }))
    }
}

module.exports = {
    GetMailsettings,
    GetMailsetting,
    AddMailsetting,
    UpdateMailsetting,
    DeleteMailsetting,
    GetActiveMailsetting,
    GetMailsettingscount
}