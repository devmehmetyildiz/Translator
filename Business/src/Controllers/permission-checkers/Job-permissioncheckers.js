const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetbyorderID(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('jobscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Jobs Screen', req.language, { en: 'Show Jobs', tr: 'İşleri Görüntüleme' }))
    }
}

async function GetJobs(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('jobscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Jobs Screen', req.language, { en: 'Show Jobs', tr: 'İşleri Görüntüleme' }))
    }
}

async function Getjobpricewithdocumentlanguage(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('jobscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Jobs Screen', req.language, { en: 'Show Jobs', tr: 'İşleri Görüntüleme' }))
    }
}

async function GetJobscount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('jobscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Jobs Screen', req.language, { en: 'Show Jobs', tr: 'İşleri Görüntüleme' }))
    }
}

async function GetJob(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('jobscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Jobs Screen', req.language, { en: 'Show Jobs', tr: 'İşleri Görüntüleme' }))
    }
}

async function AddJobs(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('jobadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Jobs Add', req.language, { en: 'Job Add', tr: 'İş Ekleme' }))
    }
}

async function UpdateJobs(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('jobupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Jobs Update', req.language, { en: 'Job Update', tr: 'İş Güncelleme' }))
    }
}

async function DeleteJobs(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('jobdelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Jobs Delete', req.language, { en: 'Job Delete', tr: 'İş Silme' }))
    }
}

module.exports = {
    GetJobs,
    GetJob,
    AddJobs,
    UpdateJobs,
    DeleteJobs,
    GetbyorderID,
    GetJobscount,
    Getjobpricewithdocumentlanguage
}