const root = process.cwd()
const userDao = require(root + '/lib/dao/userDao')
const jwtService = require(root + '/lib/services/jwtService')

exports.signup = function(username, password){
    return userDao.findByUsername(username).then((result) => {
        if (result.length === 0) {
            return userDao.save({username:username, password: password}).then((result) => {
                let user = result[0]
                return jwtService.jwt(user)
            })
        }
        return Promise.resolve(null)
    })
}
