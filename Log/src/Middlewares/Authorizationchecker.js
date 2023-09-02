const config = require('../Config')
const messages = require('../Constants/Messages')
const { sequelizeErrorCatcher, createAutherror, requestErrorCatcher } = require('../Utilities/Error')
const createValidationError = require('../Utilities/Error').createValidation
const createErrorList = require('../Utilities/Error').createList
const axios = require('axios')

const INVALID_AUTHORIZATION_HEADER = createErrorList('FORBIDDEN', 'INVALID_AUTHORIZATION_HEADER', {
    en: 'Access denied. Invalid authorization header',
    tr: 'Erişim reddedildi. Geçersiz yekilendirme başlığı',
})
const INVALID_ACCESS_TOKEN = createErrorList('FORBIDDEN', 'INVALID_ACCESS_TOKEN', {
    en: 'Access denied. Invalid access token',
    tr: 'Erişim reddedildi. Geçersiz erişim anahtarı',
})


const PUBLIC_URLS = [
    { method: 'get', url: 'Files/Downloadfile' }
]

async function authorizationChecker(req, res, next) {

    try {
        if (req.identity === undefined) req.identity = {}
        let accessToken = {}

        let isMicroservicesreq = req.headers && req.headers.session_key && req.headers.session_key === config.session.secret
        if (!isMicroservicesreq) {

            if (!isPublicUrlRequest(req.method, req.originalUrl)) {
                if (!doesAuthorizationHeaderExists(req.headers)) {
                    return next(createValidationError({
                        code: 'AUTHORIZATION_HEADER_REQUIRED', description: {
                            en: 'You need to provide authorization headers to access this resource (log)',
                            tr: 'Bu kaynağa erişmek için yetkilendirme başlıkları gerekiyor (log)',
                        }
                    }, req.language))
                }

                let isTokenValid = false
                let authorizationHeaderType = getAuthorizationHeaderType(req.headers)
                if (authorizationHeaderType === 'bearer') {
                    let bearerToken = getBearerToken(req.headers)
                    if (bearerToken) {
                        try {
                            const accessTokenresponse = await axios(
                                {
                                    method: 'POST',
                                    headers: {
                                        session_key: config.session.secret
                                    },
                                    url: config.services.Auth + 'Oauth/ValidateToken',
                                    data: {
                                        accessToken: bearerToken
                                    }
                                }
                            )
                            accessToken = accessTokenresponse.data
                            isTokenValid = true
                        } catch (err) {
                            return next(requestErrorCatcher(err, 'AUTH'))
                        }
                    }

                    if (isTokenValid) {
                        req.identity.accessToken = bearerToken
                        req.identity.user = null
                        req.identity.privileges = null

                        try {
                            let user = null
                            let userprivileges = null
                            const userresponse = await axios({
                                method: 'GET',
                                url: config.services.Userrole + `Users/${accessToken.Userid}`,
                                headers: {
                                    session_key: config.session.secret
                                }
                            })
                            user = userresponse.data
                            req.identity.user = user
                            const userprivilegesreponse = await axios({
                                method: 'GET',
                                url: config.services.Userrole + `Roles/Getprivilegesbyuserid/${user.Uuid}`,
                                headers: {
                                    session_key: config.session.secret
                                }
                            })
                            userprivileges = userprivilegesreponse.data
                            req.identity.privileges = userprivileges
                        } catch (error) {
                            return next(requestErrorCatcher(error, 'USERROLE'))
                        }
                    }
                }

            } else {
                return next(INVALID_AUTHORIZATION_HEADER[req.language])
            }
        }
        next()
    } catch (err) {
        return next(err)
    }
}

function doesAuthorizationHeaderExists(headers) {
    return headers.authorization &&
        (headers.authorization.toLowerCase().indexOf('bearer') === 0)
}

function getAuthorizationHeaderType(headers) {
    if (!headers.authorization) {
        return null
    }

    if (headers.authorization.toLowerCase().indexOf('bearer') === 0) {
        return 'bearer'
    }

    return null
}

function getBearerToken(headers) {
    if (!headers.authorization) {
        return null
    }

    let headerParts = headers.authorization.split(' ')
    if (headerParts[0].toLowerCase() == 'bearer' && headerParts.length >= 2)
        return headerParts[1]
    else
        return null
}

function isPublicUrlRequest(method, url) {
    if (url.split('/').length > 3) {
        let parsedurl = url.split('/')
        url = parsedurl[1] +'/'+ parsedurl[2]
    }
    let res = false
    let route = PUBLIC_URLS.find(u => u.method === method.toLowerCase() && u.url === url)
    if (route) {
        res = true
    }
    return res
}

module.exports = authorizationChecker