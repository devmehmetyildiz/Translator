const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function Register(req, res, next) {
    next()
}

async function Changepassword(req, res, next) {
    next()
}

async function GetUsers(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function GetUserscount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function GetUser(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function Getbyusername(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function Getbyemail(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function Getusersalt(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function Getusertablemetaconfig(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function Saveusertablemetaconfig(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('basic')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Basic', req.language, { en: 'Save user table meta', tr: 'Kullanıcı tablo meta kaydetme' }))
    }
}

async function AddUser(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('useradd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Add', req.language, { en: 'User Add', tr: 'Kullanıcı Ekleme' }))
    }
}

async function UpdateUser(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Update', req.language, { en: 'User Update', tr: 'Kullanıcı Güncelleme' }))
    }
}

async function DeleteUser(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userdelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Delete', req.language, { en: 'User Delete', tr: 'Kullanıcı Silme' }))
    }
}

async function GetActiveUsername(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function GetActiveUserMeta(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('userscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Users Screen', req.language, { en: 'Show Users', tr: 'Kullanıcıları Görüntüleme' }))
    }
}

async function Resettablemeta(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('basic')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Basic', req.language, { en: 'Reset Table meta', tr: 'Kullanıcı tablo meta sıfırlama' }))
    }
}


module.exports = {
    GetUsers,
    GetUser,
    AddUser,
    UpdateUser,
    DeleteUser,
    Register,
    Getbyusername,
    Getusersalt,
    GetActiveUsername,
    GetActiveUserMeta,
    Getusertablemetaconfig,
    Saveusertablemetaconfig,
    Getbyemail,
    Resettablemeta,
    GetUserscount,
    Changepassword
}