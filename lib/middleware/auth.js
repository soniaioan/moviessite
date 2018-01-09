const root = process.cwd()
const userDao = require(root + '/lib/dao/userDao')
const codes = require(root + '/lib/codes')
const customError = require(root + '/lib/customError')
const config = require(root +'/lib/config')
const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
    let token = req.headers['x-access-token'];
    return Promise.resolve().then(() => {
        if (!req.headers['x-access-token']) {
            throw (new customError(codes.UNAUTHORIZED.message, codes.UNAUTHORIZED.code))
        }
        return jwt.verify(token, config.get('jwtSecret'))
    }).then((decoded) => {
        return userDao.findByUserId(decoded._id)
    }).then((res) => {
        if (res.length >0) {
            req.userID = res[0]._id.toString()
            req.userName = res[0].username
            next()
        } else {
            throw (new customError(codes.UNAUTHORIZED.message, codes.UNAUTHORIZED.code))
        }
    }).catch(next)
}
