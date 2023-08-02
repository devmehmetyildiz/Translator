const createAccessDenied = require("../../Utilities/Error").createAccessDenied
const permissionchecker = require("../../Utilities/Permissionchecker")

async function GetPayments(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('paymenttypesscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Paymenttypes Screen', req.language, { en: 'Show Paymenttypes', tr: 'Ödeme Yöntem Kayıtlarını Görüntüleme' }))
    }
}

async function GetPaymentscount(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('paymenttypesscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Paymenttypes Screen', req.language, { en: 'Show Paymenttypes', tr: 'Ödeme Yöntem Kayıtlarını Görüntüleme' }))
    }
}

async function GetPayment(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('paymenttypesscreen') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Paymenttypes Screen', req.language, { en: 'Show Paymenttypes', tr: 'Ödeme Yöntem Kayıtlarını Görüntüleme' }))
    }
}

async function AddPayment(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('paymenttypesadd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Paymenttypes Add', req.language, { en: 'Paymenttype Add', tr: 'Ödeme Yöntem Kaydı Ekleme' }))
    }
}

async function AddArrayPayment(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('paymenttypesadd') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Paymenttypes Add', req.language, { en: 'Paymenttype Add', tr: 'Ödeme Yöntem Kaydı Ekleme' }))
    }
}

async function UpdatePayment(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('paymenttypesupdate') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Paymenttypes Update', req.language, { en: 'Paymenttype Update', tr: 'Ödeme Yöntem Kaydı Güncelleme' }))
    }
}

async function DeletePayment(req, res, next) {
    if (req.identity.privileges && (req.identity.privileges.includes('paymenttypesdelete') || permissionchecker(req))) {
        next()
    } else {
        next(createAccessDenied('Paymenttypes Delete', req.language, { en: 'Paymenttype Delete', tr: 'Ödeme Yöntem Kaydı Silme' }))
    }
}

module.exports = {
    GetPayments,
    GetPayment,
    AddPayment,
    AddArrayPayment,
    UpdatePayment,
    DeletePayment,
    GetPaymentscount
}