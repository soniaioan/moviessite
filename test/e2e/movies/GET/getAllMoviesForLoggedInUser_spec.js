const root = process.cwd()
const app = require(root +'/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const _ = require('lodash')
const data = require(root + '/fixtures/data')
const jw1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTNmNmNiODAzOTI2NjhhN2JjZGQzZmQiLCJpYXQiOjE1MTQ1NTUyNDIsImV4cCI6MTUxNTQxOTI0Mn0.xiyCvG5-f2pgtsX5yfnGIB2xqCvKfoyCYR7F8yttZcY'
const jw2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTQyNjBjNTY2NGIwYTIyMGMwMGJkMWUiLCJpYXQiOjE1MTQ1NTY3NTcsImV4cCI6MTUxNTQyMDc1N30.PViKMlg4IW3Fnu4LFC2UUwN_11BRQ6hEM0D7m1SRp24'


describe(' API - GET All Movies for Logged In user', () => {
    describe('/api/movies This endpoint returns all the movies of db along with the vote state of logged ' +
        'in user for every movie.', () => {
        beforeEach(function () {
            return datagen.clear().then(() => {
                return datagen.loadData(data)
            })
        })
        it('Should get all movies along with the vote state of user who is specified in cookies.', function () {
            return request(app)
                .get('/api/movies')
                .set('x-access-token', jw1)
                .expect(200)
                .then(function (res) {
                    res.body.length.should.be.equal(4)
                    let userMovie = _.find(res.body, function (movie) {
                        return movie.userId === '5a3f6cb80392668a7bcdd3fd'
                    })
                    let otherMovies = _.filter(res.body, function (movie) {
                        return movie.userId !== '5a3f6cb80392668a7bcdd3fd'
                    })
                    userMovie.isLiked.should.be.equal(false)
                    userMovie.isHated.should.be.equal(false)
                    userMovie.voteEnabled.should.be.equal(false)
                    otherMovies.forEach((movie) => {
                        should.exist(movie.isHated)
                        should.exist(movie.isLiked)
                        movie.voteEnabled.should.be.equal(true)
                    })
                }).catch(function (err) {
                    throw err
                })
        })
    })
})


