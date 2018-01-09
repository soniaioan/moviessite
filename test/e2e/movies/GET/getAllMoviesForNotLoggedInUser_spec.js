const root = process.cwd()
const app = require(root +'/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const codes = require(root + '/lib/codes')
const data = require(root + '/fixtures/data')

describe(' API - GET All Movies for a Not Logged In user', () =>{
    describe('/api/movies/all This endpoint returns all the movies of db. ' +
        'However,since no user is logged in (no cookies), vote state info should not be attached in response.',() => {
        beforeEach(function () {
            return datagen.clear().then(() => {
                return datagen.loadData(data)
            })
        })
        it('Should get all movies without any vote state info.', function () {
            return request(app)
                .get('/api/movies/all')
                .expect(200)
                .then(function (res) {
                    res.body.length.should.be.equal(4)
                    res.body.forEach((movie) => {
                        should.not.exist(movie.voteEnabled)
                    })
                }).catch(function (err) {
                    throw err
                })
        })
    })
})

