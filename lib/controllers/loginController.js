const root = process.cwd()
const loginService = require(root + '/lib/services/loginService')
const requestValidator = require(root + '/lib/validators/requestValidator')
const customError = require(root + '/lib/customError')
const Log = require('log')
    , log = new Log('info');
const codes = require(root + '/lib/codes')


exports.login = function(req, res, next) {
    let username
    let password
    return requestValidator.credentialsValidate(req.body).then((credentials) => {
       username = credentials.username
       password = credentials.password
       log.info(`[POST /api/login][username: ${username}]`)
       return loginService.login(username, password)
    }).then((result) => {
        if (result!==null) {
            log.info(`[POST /api/login][username: ${username}] [success]`)
            return res.status(200).json(result)
        }else {
            throw (new customError(codes.USER_NOT_FOUND.message,
                codes.USER_NOT_FOUND.code));
        }
    }).catch(next)
}