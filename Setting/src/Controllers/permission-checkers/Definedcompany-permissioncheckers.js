const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetDefinedcompanies(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcompanyscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcompanies Screen', req.language, { en: 'Show Definedcompany', tr: 'Tanımlı Firmaları Görüntüleme' }))
    }
}

async function GetDefinedcompaniescount(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcompanyscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcompanies Screen', req.language, { en: 'Show Definedcompany', tr: 'Tanımlı Firmaları Görüntüleme' }))
    }
}

async function GetDefinedcompany(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcompanyscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcompanies Screen', req.language, { en: 'Show Definedcompany', tr: 'Tanımlı Firmaları Görüntüleme' }))
    }
}

async function AddDefinedcompany(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcompanyadd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcompanies Add', req.language, { en: 'Definedcompany Add', tr: 'Tanımlı Firma Ekleme' }))
    }
}

async function AddArrayDefinedcompany(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcompanyadd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcompanies Add', req.language, { en: 'Definedcompany Add', tr: 'Tanımlı Firma Ekleme' }))
    }
}

async function UpdateDefinedcompany(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcompanyupdate') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcompanies Update', req.language, { en: 'Definedcompany Update', tr: 'Tanımlı Firma Güncelleme' }))
    }
}

async function DeleteDefinedcompany(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcompanydelete') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcompanies Delete', req.language, { en: 'Definedcompany Delete', tr: 'Tanımlı Firma Silme' }))
    }
}

module.exports = {
    GetDefinedcompanies,
    GetDefinedcompany,
    AddDefinedcompany,
    AddArrayDefinedcompany,
    UpdateDefinedcompany,
    DeleteDefinedcompany,
    GetDefinedcompaniescount
}