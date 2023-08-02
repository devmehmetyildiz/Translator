const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetRoles(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rolescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Screen', req.language, { en: 'Show Roles', tr: 'Rolleri Görüntüleme' }))
    }
}

async function GetRolescount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rolescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Screen', req.language, { en: 'Show Roles', tr: 'Rolleri Görüntüleme' }))
    }
}

async function GetRole(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rolescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Screen', req.language, { en: 'Show Roles', tr: 'Rolleri Görüntüleme' }))
    }
}

async function Getprivileges(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rolescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Screen', req.language, { en: 'Show Roles', tr: 'Rolleri Görüntüleme' }))
    }
}

async function Getprivilegegroups(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rolescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Screen', req.language, { en: 'Show Roles', tr: 'Rolleri Görüntüleme' }))
    }
}

async function Getprivilegesbyuserid(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rolescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Screen', req.language, { en: 'Show Roles', tr: 'Rolleri Görüntüleme' }))
    }
}

async function GetActiveuserprivileges(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('rolescreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Screen', req.language, { en: 'Show Roles', tr: 'Rolleri Görüntüleme' }))
    }
}

async function AddRole(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('roleadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Add', req.language, { en: 'Role Add', tr: 'Rol Ekleme' }))
    }
}

async function UpdateRole(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('roleupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Update', req.language, { en: 'Role Update', tr: 'Rol Güncelleme' }))
    }
}

async function DeleteRole(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('roledelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Roles Delete', req.language, { en: 'Role Delete', tr: 'Rol Silme' }))
    }
}


module.exports = {
    GetRoles,
    GetRole,
    AddRole,
    UpdateRole,
    DeleteRole,
    Getprivilegesbyuserid,
    GetActiveuserprivileges,
    Getprivileges,
    Getprivilegegroups,
    GetRolescount
}