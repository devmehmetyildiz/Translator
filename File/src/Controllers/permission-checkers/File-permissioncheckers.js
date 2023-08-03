const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetFiles(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('filescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Files Screen', req.language, { en: 'Show Files', tr: 'Dosyaları Görüntüleme' }))
    }
}

async function GetbyparentID(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('filescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Files Screen', req.language, { en: 'Show Files', tr: 'Dosyaları Görüntüleme' }))
    }
}

async function GetbyorderfileID(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('filescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Files Screen', req.language, { en: 'Show Files', tr: 'Dosyaları Görüntüleme' }))
    }
}

async function GetFile(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('filescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Files Screen', req.language, { en: 'Show Files', tr: 'Dosyaları Görüntüleme' }))
    }
}

async function Downloadfile(req, res, next) {
    /* if ((req.identity.privileges && req.identity.privileges.includes('filedownload')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Files Download', req.language, { en: 'File Download', tr: 'Dosya İndirme' }))
    } */
    next()
}

async function AddFile(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('fileadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Files Add', req.language, { en: 'File Add', tr: 'Dosya Ekleme' }))
    }
}

async function UpdateFile(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('fileupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Files Update', req.language, { en: 'File Update', tr: 'Dosya Güncelleme' }))
    }
}

async function DeleteFile(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('filedelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Files Delete', req.language, { en: 'File Delete', tr: 'Dosya Silme' }))
    }
}


module.exports = {
    GetFiles,
    GetFile,
    AddFile,
    UpdateFile,
    DeleteFile,
    Downloadfile,
    GetbyparentID,
    GetbyorderfileID
}