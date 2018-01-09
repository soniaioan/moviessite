const root = process.cwd()
const signupService = require(root + '/lib/services/signupService')
const codes = require(root + '/lib/codes')
const customError = require(root + '/lib/customError')
const requestValidator = require(root + '/lib/validators/requestValidator')
const Log = require('log')
    , log = new Log('info')


exports.signup = function(req, res, next) {
    return requestValidator.credentialsValidate(req.body).then((credentials) => {
        let username = credentials.username
        let password = credentials.password
        log.info(`[POST /api/signup][username: ${username}]`)
        return signupService.signup(username, password)
    }).then((result) => {
        if (result!==null) {
            return res.status(200).json(result)
        }
        throw (new customError(codes.ALREADY_EXISTING_USER.message,
                codes.ALREADY_EXISTING_USER.code));
    }).catch(next)
}
