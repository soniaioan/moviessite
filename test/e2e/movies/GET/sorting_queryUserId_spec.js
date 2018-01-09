const root = process.cwd()
const app = require(root +'/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const data = require(root + '/fixtures/data')
const chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-sorted'))
const jw1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTNmNmNiODAzOTI2NjhhN2JjZGQzZmQiLCJpYXQiOjE1MTQ1NTUyNDIsImV4cCI6MTUxNTQxOTI0Mn0.xiyCvG5-f2pgtsX5yfnGIB2xqCvKfoyCYR7F8yttZcY'


describe(' API - GET Movies of a Specific user: Sorting', function () {
    describe('This endpoint returns the movies the user specified in the request url has submitted.' +
        'Vote state of logged in user for every movie is attached as well. ' +
        'Use query parameter sort for sorting by likes, hates or date', function () {
        beforeEach(function () {
            return datagen.clear().then(() => {
                return datagen.loadData(data)
            })
        })
        it('Should get the submitted movies of a user sorted by likes. Ssort = likes', function () {
            return request(app)
                .get('/api/movies/user/5a4260c5664b0a220c00bd1e?sort=likes')
                .set('x-access-token', jw1)
                .expect(200)
                .then(function (res) {
                    res.body.length.should.be.equal(2)
                    expect(res.body).to.be.sortedBy('likesCounter', true)
                }).catch(function (err) {
                    throw err
                })
        })
        it('Should get the submitted movies of a user sorted by hates. Ssort = hates', function () {
            return request(app)
                .get('/api/movies/user/5a4260c5664b0a220c00bd1e?sort=likes')
                .set('x-access-token', jw1)
                .expect(200)
                .then(function (res) {
                    res.body.length.should.be.equal(2)
                    expect(res.body).to.be.sortedBy('hatesCounter', true)
                }).catch(function (err) {
                    throw err
                })
        })
        it('Should get the submitted movies of a user sorted by date (createdAt). Ssort = date', function () {
            return request(app)
                .get('/api/movies/user/5a4260c5664b0a220c00bd1e?sort=date')
                .set('x-access-token', jw1)
                .expect(200)
                .then(function (res) {
                    res.body.length.should.be.equal(2)
                    assertResponse (res.body)
                    expect(res.body).to.be.sortedBy('createdAt', true)
                }).catch(function (err) {
                    throw err
                })
        })
    })
})

function assertResponse (response) {
    response.forEach((movie) => {
        should.exist(movie.isHated)
        should.exist(movie.isLiked)
        should.exist(movie.voteEnabled)
        movie.userId.should.equal('5a4260c5664b0a220c00bd1e')
    })
}

