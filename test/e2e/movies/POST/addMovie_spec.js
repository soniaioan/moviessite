const root = process.cwd()
const app = require(root +'/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const userDao = require(root +'/lib/dao/userDao')
const movieDao = require(root +'/lib/dao/moviesDao')
require(root + '/lib/utils/assertions/movieEntry')
const codes = require(root + '/lib/codes')
const data = require(root +'/fixtures/data')
const jw1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTNmNmNiODAzOTI2NjhhN2JjZGQzZmQiLCJpYXQiOjE1MTQ1NTUyNDIsImV4cCI6MTUxNTQxOTI0Mn0.xiyCvG5-f2pgtsX5yfnGIB2xqCvKfoyCYR7F8yttZcY'

describe(' API - POST Movies', () => {
    describe(' api/movie Use this endpoint to add a new movie. Only a logged in user can add a movie via api. User id and username are set by the cookies in request.', () => {
        beforeEach(function () {
            return datagen.clear().then(() => {
                return datagen.loadData(data)
            })
        })
        it('Should add a new movie', function () {
            var data = {
                title: 'Kill Bill Vol 3',
                description: 'Taradino B movie'
            }
            return request(app)
                .post('/api/movies')
                .set('x-access-token', jw1)
                .send(data)
                .expect(200)
                .then(function (res) {
                    res.body.length.should.be.equal(2)
                    return movieDao.findByQuery({'title': data.title}).then((result) => {
                        result[0].should.be.a.ValidMovieEntry(data);
                    })
                }).catch(function (err) {
                    throw err
                })
        })
        it('Should not add a new movie if fields are missing', function () {
            var data = {
                title: 'Kill Bill Vol 3'
            }
            return request(app)
                .post('/api/movies')
                .set('x-access-token', jw1)
                .send(data)
                .expect(400)
                .then(function (res) {
                    res.body.error.should.equal('child "description" fails because ["description" is required]')
                }).catch(function (err) {
                    throw err
                })
        })
    })
})



