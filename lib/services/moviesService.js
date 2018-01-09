const root = process.cwd()
const moviesDao = require(root + '/lib/dao/moviesDao')
const userDao = require(root + '/lib/dao/userDao')
const _= require('lodash')

exports.fetchMoviesByUserId = function(sort, userId, queryUserId){
    return moviesDao.findMovies(sort, queryUserId).then((movies) => {
        return userDao.findByUserId(userId).then((users) => {
            return this.setVoteState(movies, users[0])
        })
    })
}

exports.addMovie = function(movie){
    return moviesDao.save(movie).then((result) => {
        return Promise.resolve(result)
    })
}

exports.fetchAllMovies = function(sort, userId) {
    return moviesDao.findMovies(sort).then((movies) => {
        if (userId) {
            return userDao.findByUserId(userId).then((users) => {
                return this.setVoteState(movies, users[0])
            })
        }
        return Promise.resolve(movies)
    })
}

exports.voteMovie  = function(voteAction, movieId, userId) {
    return userDao.updateVotesHistory(voteAction, movieId, userId).then((voteActions)=> {
        return moviesDao.updateCounters(voteActions, movieId)
    })
}

exports.setVoteState = function(movies, user) {
    movies.forEach((movie) =>{
        movie.voteEnabled = true
        movie.isLiked = false
        movie.isHated = false
        if (user._id.toString() === movie.userId) {
            movie.voteEnabled = false
        }
        if (user.likes.indexOf(movie._id.toString())>-1){
            movie.isLiked = true
        }
        if (user.hates.indexOf(movie._id.toString())>-1){
            movie.isHated = true
        }
    })
    return Promise.resolve(movies)
}
