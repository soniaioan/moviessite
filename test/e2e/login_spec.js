const root = process.cwd()
const app = require(root + '/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const codes = require(root + '/lib/codes')


describe('API - Login', function () {
    beforeEach(function () {
        return datagen.clear().then(() =>{
            return datagen.loadData(require(root + '/fixtures/data'))
        })
    })
    it('Should login an existing user', function () {
        return request(app)
            .post('/api/login')
            .send({username: 'George', password:'12345'})
            .expect(200)
            .then(function (res) {
                res.body.username.should.equal('George')
                should.exist(res.body.token)
                should.not.exist(res.body.password)
            }).catch(function (err) {
                throw err
            })
    })
    it('Should not login an existing user if the password in request is different', function () {
        return request(app)
          .post('/api/login')
          .send({username: 'George', password:'123'})
          .expect(400)
          .then(function (res) {
              res.body.error.should.equal(codes.USER_NOT_FOUND.message)
          }).catch(function (err) {
              throw err
          })
    })
    it('Should not login a user who does not exist in db', function () {
        return request(app)
            .post('/api/login')
            .send({username: 'sonia', password: '12345'})
            .expect(400)
            .then(function (res) {
                res.body.error.should.equal(codes.USER_NOT_FOUND.message)
            }).catch(function (err) {
                throw err
            })
    })
    it('Should return invalid credentials if username or password are missing in request', function () {
        return request(app)
            .post('/api/login')
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
            .post('/api/login')
            .send({username: '', password: ''})
            .expect(400)
            .then(function (res) {
                res.body.error.should.equal('child "username" fails because ["username" is not allowed to be empty]')
            }).catch(function (err) {
                throw err
            })
    })
})
