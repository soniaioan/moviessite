const root = process.cwd()
const app = require(root +'/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const data = require(root +'/fixtures/data')
const chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-sorted'))
const jw1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTNmNmNiODAzOTI2NjhhN2JjZGQzZmQiLCJpYXQiOjE1MTQ1NTUyNDIsImV4cCI6MTUxNTQxOTI0Mn0.xiyCvG5-f2pgtsX5yfnGIB2xqCvKfoyCYR7F8yttZcY'
const jw2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTQyNjBjNTY2NGIwYTIyMGMwMGJkMWUiLCJpYXQiOjE1MTQ1NTY3NTcsImV4cCI6MTUxNTQyMDc1N30.PViKMlg4IW3Fnu4LFC2UUwN_11BRQ6hEM0D7m1SRp24'

describe(' API - GET Movies of a Specific user', () => {
    describe('api/movies/user/userId This endpoint returns the movies of a specific user. User is specified in request url. ' +
        'Vote state of logged in user should be attached as well for every movie.', () => {
        beforeEach(function () {
            return datagen.clear().then(() => {
                return datagen.loadData(data)
            })
        })
        it('Should get the movies a specific user.', function () {
            return request(app)
                .get('/api/movies/user/5a4260c5664b0a220c00bd1e')
                .set('x-access-token', jw1)
                .expect(200)
                .then(function (res) {
                    res.body.length.should.be.equal(2)
                    res.body.forEach((movie) => {
                        should.exist(movie.isHated)
                        should.exist(movie.isLiked)
                        should.exist(movie.voteEnabled)
                        movie.userId.should.equal('5a4260c5664b0a220c00bd1e')
                    })
                }).catch(function (err) {
                    throw err
                })
        })
    })
})


