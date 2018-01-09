const root = process.cwd()
const app = require(root +'/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const data = require(root +'/fixtures/data')
const _ = require('lodash')
const chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-sorted'))
const jw1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTNmNmNiODAzOTI2NjhhN2JjZGQzZmQiLCJpYXQiOjE1MTQ1NTUyNDIsImV4cCI6MTUxNTQxOTI0Mn0.xiyCvG5-f2pgtsX5yfnGIB2xqCvKfoyCYR7F8yttZcY'


describe(' API - GET All Movies: Sorting', function () {
    describe('api/movies?sort=$sort All Movies and Sorting. ' +
        'This endpoint returns all the movies along with the vote state of logged in user for every movie. ' +
        'Use query parameter sort for sorting by likes, hates or date', function () {
        beforeEach(function () {
            return datagen.clear().then(() => {
                return datagen.loadData(data)
            })
        })
        it('Should get all movies sorted by likes. Sort = likes', function () {
            return request(app)
                .get('/api/movies?sort=likes')
                .set('x-access-token', jw1)
                .expect(200)
                .then(function (res) {
                    assertResponse(res.body)
                    expect(res.body).to.be.sortedBy('likesCounter', true)
                }).catch(function (err) {
                    throw err
                })
        })
        it('Should get all movies sorted by hates. Sort = hates', function () {
            return request(app)
                .get('/api/movies?sort=hates')
                .set('x-access-token', jw1)
                .expect(200)
                .then(function (res) {
                    assertResponse(res.body)
                    expect(res.body).to.be.sortedBy('hatesCounter', true)
                }).catch(function (err) {
                    throw err
                })
        })
        it('Should get all movies sorted by date (createdAt). Sort = date', function () {
            return request(app)
                .get('/api/movies?sort=date')
                .set('x-access-token', jw1)
                .expect(200)
                .then(function (res) {
                    assertResponse(res.body)
                    expect(res.body).to.be.sortedBy('createdAt', true)
                }).catch(function (err) {
                    throw err
                })
        })
    })
})

function assertResponse (response) {
    response.length.should.be.equal(4)
    let userMovie =_.find(response, function(movie){
        return movie.userId === '5a3f6cb80392668a7bcdd3fd'
    })
    let otherMovies =_.filter(response, function(movie){
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
}
