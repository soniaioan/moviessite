const root = process.cwd()
const userDao = require(root + '/lib/dao/userDao')
const bcrypt = require('bcrypt')
const jwtService = require(root + '/lib/services/jwtService')

exports.login = function(username, password){
    return userDao.findByUsername(username).then((result) => {
        let user
        if (result.length === 1) {
            user = result[0]
            return bcrypt.compare(password, user.password).then((res) => {
                if (res === true) {
                    return jwtService.jwt(user)
                }
            return Promise.resolve(null)
            })
        }
        return Promise.resolve(null)
    })
}
