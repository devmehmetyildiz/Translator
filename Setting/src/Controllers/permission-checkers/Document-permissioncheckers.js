const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetDocuments(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('documentscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function GetDocumentscount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('documentscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function GetDocument(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('documentscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Documents Screen', req.language, { en: 'Show Documents', tr: 'Belgeleri Görüntüleme' }))
    }
}

async function AddDocument(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('documentadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Documents Add', req.language, { en: 'Document Add', tr: 'Belge Ekleme' }))
    }
}

async function AddArrayDocument(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('documentadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Documents Add', req.language, { en: 'Document Add', tr: 'Belge Ekleme' }))
    }
}

async function UpdateDocument(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('documentupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Documents Update', req.language, { en: 'Document Update', tr: 'Belge Güncelleme' }))
    }
}

async function DeleteDocument(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('documentdelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Documents Delete', req.language, { en: 'Document Delete', tr: 'Belge Silme' }))
    }
}

module.exports = {
    GetDocuments,
    GetDocument,
    AddDocument,
    AddArrayDocument,
    UpdateDocument,
    DeleteDocument,
    GetDocumentscount
}