const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetOrders(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetOrdersforchart(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetOrderswithdate(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetPricenet(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetPricepotancial(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetPricereal(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetPriceexpence(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetOrdercountbydate(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetOrdercountwithjob(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetOrderscount(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function GetOrder(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderscreen')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Screen', req.language, { en: 'Show Orders', tr: 'Siparişleri Görüntüleme' }))
    }
}

async function AddOrders(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderadd')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Add', req.language, { en: 'Order Add', tr: 'Sipariş Ekleme' }))
    }
}

async function UpdateOrders(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderupdate')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Update', req.language, { en: 'Order Update', tr: 'Sipariş Güncelleme' }))
    }
}

async function DeleteOrders(req, res, next) {
    if ((req.identity.privileges && req.identity.privileges.includes('orderdelete')) || permissionchecker(req)) {
        next()
    } else {
        next(createAccessDenied('Orders Delete', req.language, { en: 'Order Delete', tr: 'Sipariş Silme' }))
    }
}

module.exports = {
    GetOrders,
    GetOrder,
    AddOrders,
    UpdateOrders,
    DeleteOrders,
    GetOrderscount,
    GetPricenet,
    GetPricepotancial,
    GetPricereal,
    GetPriceexpence,
    GetOrdercountbydate,
    GetOrdercountwithjob,
    GetOrderswithdate,
    GetOrdersforchart
}