const root = process.cwd()
const app = require(root +'/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const codes = require(root + '/lib/codes')
const data = require(root +'/fixtures/data')



describe(' API - GET Movies AUTH VALIDATION', function () {
    beforeEach(function () {
        return datagen.clear().then(() =>{
            return datagen.loadData(data)
        })
    })
    it('Should not get the movies a user has submitted if x-access-token header is missing', function () {
        return request(app)
            .get('/api/movies/user/5a3f6cb80392668a7bcdd3fd')
            .expect(401)
            .then(function (res) {
                res.body.error.should.be.equal(codes.UNAUTHORIZED.message)
            }).catch(function (err) {
                throw err
            })
    })
    it('Should not send the movies along with vote state if x-access-token header is missing', function () {
        return request(app)
            .get('/api/movies')
            .expect(401)
            .then(function (res) {
                res.body.error.should.be.equal(codes.UNAUTHORIZED.message)
            }).catch(function (err) {
                throw err
            })
    })
    it('Should not send the movies along with vote state if x-access-token header contains an invalid token', function () {
        return request(app)
          .get('/api/movies')
          .set('x-access-token', 'sfsdgdsgsdgs')
          .expect(400)
          .then(function (res) {
              res.body.error.should.equal('jwt malformed')
          }).catch(function (err) {
              throw err
          })
    })
})

