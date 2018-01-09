const root = process.cwd()
const should = require('should')
const expect = require('chai').expect
const Promise = require('bluebird')
const sinon = require('sinon')
const userDao = require(root + '/lib/dao/userDao')
const auth = require(root +'/lib/middleware/auth')
const codes = require(root + '/lib/codes')
const moviesService = require(root +'/lib/services/moviesService')
const ObjectId = require('mongoose').Types.ObjectId;
describe('Unit Tests: MoviesService and Vote state. The vote state of every movie is defined by three boolean flags:' +
    'voteEnabled = true if user has not submitted the movie and thus he can vote it (parameter userId is not equal with userId of movie)' +
    'isLiked = true if user has already liked the movie (movie id belongs to likes array property of user model' +
    'isHated = true if user has already hated the movie (movie id belongs to hates array property of user model). ' +
    'Function voteState based on data determines and sets these flags for every movie', () => {
    it('If the parameter user id is not equal with the userId of movies , voteEnabled should be true. In this test user has already hated the first movie. ' +
        'Verify isHated = true ', () => {
        let movies = [{
            _id:  new ObjectId('5a3f6cb80392668a7bcdd3fb'),
            title: 'Kill Bill Vol 1',
            description: 'Taradino B movie1',
            userId: '5a3f6cb80392668a7bcdd3fd',
            likesCounter: 12,
            hatesCounter: 13
        },
        {
            _id:  new ObjectId('5a3f6cb80392668a7bcdd3fc'),
            title: 'Kill Bill Vol 2',
            description: 'Taradino B movie2',
            userId: '5a3f6cb80392668a7bcdd3fd',
            likesCounter: 2,
            hatesCounter: 13
        }]
        let user = {
            _id : ObjectId('5a4260c5664b0a220c00bd1e'),
            username : 'Maria',
            password : '12345',
            hates : ['5a3f6cb80392668a7bcdd3fb'],
            likes : []
        }
        return moviesService.setVoteState(movies, user).then((result) => {
            result[0].voteEnabled.should.be.equal(true)
            result[0].isHated.should.be.equal(true)
            result[0].isLiked.should.be.equal(false)
            result[1].voteEnabled.should.be.equal(true)
            result[1].isHated.should.be.equal(false)
            result[1].isLiked.should.be.equal(false)
        }).catch((err) =>{
           throw err
        })
    })
    it('If the parameter user id is equal with the userId of movie , ' +
        'voteEnabled should be false. In this test user has submitted the second movie and has already liked the first movie. ' +
        'Verify isLiked = true ', () => {
        let movies = [{
            _id:  new ObjectId('5a3f6cb80392668a7bcdd3fb'),
            title: 'Kill Bill Vol 1',
            description: 'Taradino B movie1',
            userId: '5a3f6cb80392668a7bcdd3fd',
            likesCounter: 12,
            hatesCounter: 13
        },
            {
                _id:  new ObjectId('5a3f6cb80392668a7bcdd3fc'),
                title: 'Kill Bill Vol 2',
                description: 'Taradino B movie2',
                userId: '5a4260c5664b0a220c00bd1e',
                likesCounter: 2,
                hatesCounter: 13
            }]
        let user = {
            _id : ObjectId('5a4260c5664b0a220c00bd1e'),
            username : 'Maria',
            password : '12345',
            hates : [],
            likes : ['5a3f6cb80392668a7bcdd3fb']
        }
        return moviesService.setVoteState(movies, user).then((result) => {
            result[0].voteEnabled.should.be.equal(true)
            result[0].isHated.should.be.equal(false)
            result[0].isLiked.should.be.equal(true)
            result[1].voteEnabled.should.be.equal(false)
            result[1].isHated.should.be.equal(false)
            result[1].isLiked.should.be.equal(false)
        }).catch((err) =>{
            throw err
        })
    })
})
