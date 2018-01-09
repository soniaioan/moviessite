const root = process.cwd()
const app = require(root + '/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
require(root + '/lib/utils/assertions/userEntry')
const userDao = require(root +'/lib/dao/userDao')
const codes = require(root + '/lib/codes')
describe('API - Signup', function () {
    beforeEach(function () {
        return datagen.clear().then(() =>{
            return datagen.loadData(require(root + '/fixtures/data'))
        })
    })
    it('Should register a new user', function () {
        let data = {username: 'sonia', 'password':'123456'}
        return request(app)
            .post('/api/signup')
            .send(data)
            .expect(200)
            .then(function (res) {
                should.exist(res.body.username)
                should.exist(res.body.token)
                should.not.exist(res.body.password)
                return userDao.findByUsername(data.username).then((result)=>{
                    result[0].should.be.a.ValidUserEntry(data);
                })
            }).catch(function (err) {
                throw err
            })
    })
    it('Should not register the user if the username already exists', function () {
        return request(app)
            .post('/api/signup')
            .send({username: 'George', password: '12345'})
            .expect(400)
            .then(function (res) {
                res.body.error.should.equal(codes.ALREADY_EXISTING_USER.message)
            }).catch(function (err) {
                throw err
            })
    })
    it('Should return invalid credentials if username or password are missing in request', function () {
        return request(app)
            .post('/api/signup')
            .send({username: 'George'})
            .expect(400)
            .then(function (res) {
                res.body.error.should.equal('child "password" fails because ["password" is required]')
            }).catch(function (err) {
                throw err
            })
    })
    it('Should return invalid credentials if username or password are empty', function () {
        return request(app)
            .post('/api/signup')
            .send({username: '', password: ''})
            .expect(400)
            .then(function (res) {
                res.body.error.should.equal('child "username" fails because ["username" is not allowed to be empty]')
            }).catch(function (err) {
                throw err
            })
    })
})
