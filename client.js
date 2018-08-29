const request = require('superagent')
const API_HOST = process.env.API_HOST || 'http://localhost'
const API_PORT = process.env.API_PORT || 9130
const API_ENDPOINT = `${API_HOST}:${API_PORT}`

const okapiRequest = function () {
    const data = {
        "tenant": "diku",
        "username": "diku_admin",
        "password": "admin"
    };

    return request
        .post(`${API_ENDPOINT}/authn/login`)
        .send(data) // sends a JSON post body
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Okapi-Tenant', 'diku')
        .then(response => {
            return {
                status: response.status,
                header: response.header,
                body: response.body
            }
        }, error => {
            return error
        })
}

module.exports = {
    okapiRequest
}
