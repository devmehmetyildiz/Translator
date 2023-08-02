const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetRules(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rulescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Screen', req.language, { en: 'Show Printtemplates', tr: 'Yazırma Taslaklarını Görüntüleme' }))
    }
}

async function GetRulescount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rulescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Screen', req.language, { en: 'Show Rules', tr: 'Kuralları Görüntüleme' }))
    }
}

async function GetRulelogs(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rulescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Screen', req.language, { en: 'Show Rules', tr: 'Kuralları Görüntüleme' }))
    }
}

async function ClearRulelogs(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('canclearrulelog')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Can Clear Rule Logs', req.language, { en: 'Show Rules', tr: 'Kural Kayıtlarını Temizleme' }))
    }
}

async function GetRule(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rulescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Screen', req.language, { en: 'Show Rules', tr: 'Kuralları Görüntüleme' }))
    }
}

async function AddRule(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('ruleadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Add', req.language, { en: 'Rule Add', tr: 'Kural Ekleme' }))
    }
}

async function UpdateRule(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('ruleupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Update', req.language, { en: 'Rule Update', tr: 'Kural Güncelleme' }))
    }
}

async function DeleteRule(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('ruledelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Delete', req.language, { en: 'Rule Delete', tr: 'Kural Silme' }))
    }
}

async function StopRule(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('canstoprule')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Rules Can Stop Rule', req.language, { en: 'Rule Can Stop', tr: 'Kural Durdurma' }))
    }
}

module.exports = {
    GetRules,
    GetRule,
    AddRule,
    UpdateRule,
    DeleteRule,
    GetRulelogs,
    ClearRulelogs,
    StopRule,
    GetRulescount
}