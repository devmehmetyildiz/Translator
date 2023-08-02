const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetDefinedcostumers(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcostumerscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcostumers Screen', req.language, { en: 'Show Definedcostumers', tr: 'Tanımlı Müşterileri Görüntüleme' }))
    }
}

async function GetDefinedcostumerscount(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcostumerscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcostumers Screen', req.language, { en: 'Show Definedcostumers', tr: 'Tanımlı Müşterileri Görüntüleme' }))
    }
}

async function GetDefinedcostumer(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcostumerscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcostumers Screen', req.language, { en: 'Show Definedcostumers', tr: 'Tanımlı Müşterileri Görüntüleme' }))
    }
}

async function AddDefinedcostumer(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcostumeradd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcostumers Add', req.language, { en: 'Definedcostumer Add', tr: 'Tanımlı Müşteri Ekleme' }))
    }
}

async function AddArrayDefinedcostumer(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcostumeradd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcostumers Add', req.language, { en: 'Definedcostumer Add', tr: 'Tanımlı Müşteri Ekleme' }))
    }
}

async function UpdateDefinedcostumer(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcostumerupdate') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcostumers Update', req.language, { en: 'Definedcostumer Güncelleme', tr: 'Tanımlı Müşteri Güncelleme' }))
    }
}

async function DeleteDefinedcostumer(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('definedcostumerdelete') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Definedcostumers Delete', req.language, { en: 'Definedcostumer Delete', tr: 'Tanımlı Müşteri Silme' }))
    }
}

module.exports = {
    GetDefinedcostumers,
    GetDefinedcostumer,
    AddDefinedcostumer,
    AddArrayDefinedcostumer,
    UpdateDefinedcostumer,
    DeleteDefinedcostumer,
    GetDefinedcostumerscount
}