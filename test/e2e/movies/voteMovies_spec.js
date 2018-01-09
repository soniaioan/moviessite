const root = process.cwd()
const app = require(root + '/app')
const request = require('supertest')
const datagen = require(root + '/lib/datagen')
const should = require('should')
const userDao = require(root +'/lib/dao/userDao')
const movieDao = require(root +'/lib/dao/moviesDao')
require(root + '/lib/utils/assertions/movieEntry')
const _ = require('lodash')
const codes = require(root + '/lib/codes')
const data = require(root + '/fixtures/data')
const jw1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTNmNmNiODAzOTI2NjhhN2JjZGQzZmQiLCJpYXQiOjE1MTQ1NTUyNDIsImV4cCI6MTUxNTQxOTI0Mn0.xiyCvG5-f2pgtsX5yfnGIB2xqCvKfoyCYR7F8yttZcY'

describe(' API - PUT Vote Movies: ', () => {
    describe('api/vote/movieId Use this endpoint to vote a movie by sending the vote action. ' +
        'User likes/hates arrays along with movie likes/haters counters ' +
        'should get updated accordingly', () => {
        beforeEach(function () {
            return datagen.clear().then(() => {
                return datagen.loadData(data)
            })
        })
        it('CASE LIKE/UNLIKE: User likes a movie for a very first time. Likes counter of the movie should get increased and likes array of user ' +
            'should include the id of the movie. Then he unlikes the same movie. Like should get retracted from records.', function () {
            return request(app)
                .put('/api/vote/5a3f6cb80392668a7bcdd3fb')
                .set('x-access-token', jw1)
                .send({vote: 'like'})
                .expect(200)
                .then(function (res) {
                    let promiseAssertions = [userDao.findByUserId('5a3f6cb80392668a7bcdd3fd'), movieDao.findByMovieId('5a3f6cb80392668a7bcdd3fb')]
                    return Promise.all(promiseAssertions).then((results) => {
                        let users = results[0]
                        let movies = results[1]
                        users[0].likes.indexOf('5a3f6cb80392668a7bcdd3fb').should.be.greaterThan(-1)
                        movies[0].likesCounter.should.be.equal(13)
                        return request(app)
                            .put('/api/vote/5a3f6cb80392668a7bcdd3fb')
                            .set('x-access-token', jw1)
                            .send({vote: 'unlike'})
                            .expect(200)
                            .then(function (res) {
                                let promiseAssertions = [userDao.findByUserId('5a3f6cb80392668a7bcdd3fd'), movieDao.findByMovieId('5a3f6cb80392668a7bcdd3fb')]
                                return Promise.all(promiseAssertions).then((results) => {
                                    let users = results[0]
                                    let movies = results[1]
                                    users[0].likes.indexOf('5a3f6cb80392668a7bcdd3fb').should.be.lessThan(0)
                                    movies[0].likesCounter.should.be.equal(12)
                                })
                            })
                    })
                }).catch(function (err) {
                    throw err
                })
        })
        it('CASE HATE/UNHATE: User hates a movie for a very first time. Hates counter of the movie should get increased and hates array of user ' +
            'should include the id of the movie. Then he unhates the same movie. Hate should get retracted from records.', function () {
            return request(app)
                .put('/api/vote/5a3f6cb80392668a7bcdd3fb')
                .set('x-access-token', jw1)
                .send({vote: 'hate'})
                .expect(200)
                .then(function (res) {
                    let promiseAssertions = [userDao.findByUserId('5a3f6cb80392668a7bcdd3fd'), movieDao.findByMovieId('5a3f6cb80392668a7bcdd3fb')]
                    return Promise.all(promiseAssertions).then((results) => {
                        let users = results[0]
                        let movies = results[1]
                        users[0].hates.indexOf('5a3f6cb80392668a7bcdd3fb').should.be.greaterThan(-1)
                        movies[0].hatesCounter.should.be.equal(14)
                        return request(app)
                            .put('/api/vote/5a3f6cb80392668a7bcdd3fb')
                            .set('x-access-token', jw1)
                            .send({vote: 'unhate'})
                            .expect(200)
                            .then(function (res) {
                                let promiseAssertions = [userDao.findByUserId('5a3f6cb80392668a7bcdd3fd'), movieDao.findByMovieId('5a3f6cb80392668a7bcdd3fb')]
                                return Promise.all(promiseAssertions).then((results) => {
                                    let users = results[0]
                                    let movies = results[1]
                                    users[0].hates.indexOf('5a3f6cb80392668a7bcdd3fb').should.be.lessThan(0)
                                    movies[0].hatesCounter.should.be.equal(13)
                                })
                            })
                    })
                }).catch(function (err) {
                    throw err
                })
        })
        it('CASE LIKE/RETRACT HATE: User likes a movie which has already hated it in the past. ' +
            'Hate vote should get retracted and records should get updated with the new like.', function () {
            return request(app)
                .put('/api/vote/5a3f6cb80392668a7bcdd3f5')
                .set('x-access-token', jw1)
                .send({vote: 'like'})
                .expect(200)
                .then((res) => {
                    let promiseAssertions = [userDao.findByUserId('5a3f6cb80392668a7bcdd3fd'), movieDao.findByMovieId('5a3f6cb80392668a7bcdd3f5')]
                    return Promise.all(promiseAssertions)
                }).then((results) => {
                    let users = results[0]
                    let movies = results[1]
                    users[0].hates.indexOf('5a3f6cb80392668a7bcdd3f5').should.be.lessThan(0)
                    users[0].likes.indexOf('5a3f6cb80392668a7bcdd3f5').should.be.greaterThan(-1)
                    movies[0].hatesCounter.should.be.equal(12)
                    movies[0].likesCounter.should.be.equal(3)
                }).catch(function (err) {
                    throw err
                })
        })
        it('CASE HATE/RETRACT LIKE: User hates a movie which has already liked it in the past. ' +
            'Like vote should get retracted and records should get updated with the new hate.', function () {
            return request(app)
                .put('/api/vote/5a3f6cb80392668a7bcdd3fa')
                .set('x-access-token', jw1)
                .send({vote: 'hate'})
                .expect(200)
                .then((res) => {
                    let promiseAssertions = [userDao.findByUserId('5a3f6cb80392668a7bcdd3fd'), movieDao.findByMovieId('5a3f6cb80392668a7bcdd3fa')]
                    return Promise.all(promiseAssertions)
                }).then((results) => {
                    let users = results[0]
                    let movies = results[1]
                    users[0].likes.indexOf('5a3f6cb80392668a7bcdd3fa').should.be.lessThan(0)
                    users[0].hates.indexOf('5a3f6cb80392668a7bcdd3fa').should.be.greaterThan(-1)
                    movies[0].hatesCounter.should.be.equal(14)
                    movies[0].likesCounter.should.be.equal(1)
                }).catch(function (err) {
                    throw err
                })
        })
    })
})
