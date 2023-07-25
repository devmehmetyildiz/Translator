const axios = require("axios")
const config = require("../Config")

module.exports = async (method, url) => {
    const response = await axios({
        method: method,
        url: url,
        headers: {
            session_key: config.session.secret
        }
    })
    return response.data
}