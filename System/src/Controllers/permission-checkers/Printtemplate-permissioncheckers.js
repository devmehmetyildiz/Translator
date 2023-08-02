const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetPrinttemplates(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('printtemplatescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Printtemplates Screen', req.language, { en: 'Show Printtemplates', tr: 'Yazırma Taslaklarını Görüntüleme' }))
    }
}

async function GetPrinttemplatescount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('printtemplatescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Printtemplates Screen', req.language, { en: 'Show Printtemplates', tr: 'Yazırma Taslaklarını Görüntüleme' }))
    }
}

async function GetPrinttemplate(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('printtemplatescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Printtemplates Screen', req.language, { en: 'Show Printtemplates', tr: 'Yazırma Taslaklarını Görüntüleme' }))
    }
}

async function AddPrinttemplate(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('printtemplateadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Printtemplates Add', req.language, { en: 'Printtemplate Add', tr: 'Yazırma Taslağı Ekleme' }))
    }
}

async function UpdatePrinttemplate(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('printtemplateupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Printtemplates Update', req.language, { en: 'Printtemplate Update', tr: 'Yazırma Taslağı Güncelleme' }))
    }
}

async function DeletePrinttemplate(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('printtemplatedelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Printtemplates Delete', req.language, { en: 'Printtemplate Delete', tr: 'Yazırma Taslağı Silme' }))
    }
}

module.exports = {
    GetPrinttemplates,
    GetPrinttemplate,
    AddPrinttemplate,
    UpdatePrinttemplate,
    DeletePrinttemplate,
    GetPrinttemplatescount
}