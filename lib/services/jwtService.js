const root = process.cwd()
const userDao = require(root + '/lib/dao/userDao')
const config = require(root +'/lib/config')
const jwt = require('jsonwebtoken')

exports.jwt = function(user) {
    let response = {}
    response.username = user.username
    let token = jwt.sign({_id: user._id.toString()}, config.get('jwtSecret'), {expiresIn: config.get('jwtExpiration')})
    if (token !== undefined) {
        response.token = token
        return userDao.updateJwt(user.username, token).then(() => {
            return Promise.resolve(response)
        })
    }
    return Promise.resolve(null)
}
