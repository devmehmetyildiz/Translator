const config = require("../Config")

module.exports = (req) => {
    let isMicroservicesreq = req.headers && req.headers.session_key && req.headers.session_key === config.session.secret
    if (isMicroservicesreq) {
        return true
    }
    if (req.identity.privileges && req.identity.privileges.includes('admin')) {
        console.log("gelidm")
        return true
    }
    return false
}