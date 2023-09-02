const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetRecordtypes(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('recordtypescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Recordtypes Screen', req.language, { en: 'Show Recordtypes', tr: 'Kayıt Türü Görüntüleme' }))
    }
}

async function GetRecordtypescount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('recordtypescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Recordtypes Screen', req.language, { en: 'Show Recordtypes', tr: 'Kayıt Türü Görüntüleme' }))
    }
}

async function GetRecordtype(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('recordtypescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Recordtypes Screen', req.language, { en: 'Show Recordtypes', tr: 'Kayıt Türü Görüntüleme' }))
    }
}

async function AddRecordtype(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('recordtypeadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Recordtypes Add', req.language, { en: 'Recordtype Add', tr: 'Kayıt Türü Ekleme' }))
    }
}

async function AddArrayRecordtype(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('recordtypeadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Recordtypes Add', req.language, { en: 'Recordtype Add', tr: 'Kayıt Türü Ekleme' }))
    }
}

async function UpdateRecordtype(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('recordtypeupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Recordtypes Update', req.language, { en: 'Recordtype Update', tr: 'Kayıt Türü Güncelleme' }))
    }
}

async function DeleteRecordtype(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('recordtypedelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Recordtypes Delete', req.language, { en: 'Recordtype Delete', tr: 'Kayıt Türü Silme' }))
    }
}

module.exports = {
    GetRecordtypes,
    GetRecordtype,
    AddRecordtype,
    AddArrayRecordtype,
    UpdateRecordtype,
    DeleteRecordtype,
    GetRecordtypescount
}