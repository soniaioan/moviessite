const root = process.cwd()
const Movie = require(root + '/lib/models/movie')
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId


exports.findByUserId = function(userId){
    return Movie.findAsync({userId:userId})
}

exports.findByMovieId = function(movieId){
    return Movie.findAsync({_id: movieId})
}

exports.updateCounters = function(votes, movieId) {
    let incOp = {}
    let updatePromises = []
    votes.forEach(vote => {
        switch(vote) {
            case 'like':
                incOp = { $inc: { "likesCounter": 1 } }
                break;
            case 'unlike':
                incOp = { $inc: { "likesCounter": -1 } }
                break;
            case 'hate':
                incOp = { $inc: { "hatesCounter": 1 } }
                break;
            case 'unhate':
                incOp = { $inc: { "hatesCounter": -1 } }
                break;
        }
        updatePromises.push(Movie.updateAsync({_id: new ObjectId(movieId)},incOp))
    })
    return Promise.all(updatePromises)
}

exports.insert = function(movie) {
    var mongooseMovie = new Movie(movie)
    return mongooseMovie.saveAsync(movie)
}

exports.save = function(movie){
    var mongooseMovie = new Movie(movie)
    mongooseMovie._id = mongoose.Types.ObjectId()
    return mongooseMovie.saveAsync(movie)
}

exports.findMovies = function(sort, userId){
    let query = {}
    if (userId) {
        query = {userId:userId}
    }
    if (sort!='') {
        if (sort === 'date'){
            sort = {sort: {createdAt: -1}}
        }
        if (sort === 'likes') {
            sort = {sort: {likesCounter: -1}}
        }
        if (sort === 'hates') {
            sort = {sort: {hatesCounter: -1}}
        }
    } else {
        sort = null
    }
    return Movie.find(query, null, sort, null).lean().execAsync()
}

exports.findByQuery = function(query) {
    return Movie.findAsync(query)
}

exports.remove = function() {
    return Movie.remove()
}
