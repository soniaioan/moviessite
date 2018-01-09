const root = process.cwd()
const moviesService = require(root + '/lib/services/moviesService')
const Log = require('log')
    , log = new Log('info');
const codes = require(root + '/lib/codes')
const customError = require(root + '/lib/customError')
const requestValidator = require(root + '/lib/validators/requestValidator')


exports.getMoviesOfUser = function(req, res, next) {
    let queryUserId = req.params.userId
    let userId
    if (req.userID) {
        userId = req.userID
    }
    let sort = null
    if (req.query.sort) {
        sort = req.query.sort
    }
    log.info(`[GET /api/movies/user/:userId][userID: ${userId}] [queryUserId: ${queryUserId}]`)
    return moviesService.fetchMoviesByUserId(sort, userId, queryUserId).then((result) => {
        return res.status(200).json(result)
    }).catch(next)
}

exports.addMovie = function(req, res, next) {
    return requestValidator.movieValidate(req.body).then((result) => {
        let movie = {
            title: result.title,
            description: result.description,
            userId: req.userID,
            username: req.userName
        }
        log.info(`[POST /api/movies/][movie: ${JSON.stringify(movie)}]`)
        return moviesService.addMovie(movie)})
      .then((result) => {
        return res.status(200).json(result)
    }).catch(next)
}

exports.getAllMovies = function(req, res, next) {
    let sort = null
    let userId
    if (req.query.sort) {
        sort = req.query.sort
    }
    if (req.userID) {
        userId = req.userID
    }
    log.info(`[GET /api/movies][sort: ${sort}] [userID: ${userId}]`)
    return moviesService.fetchAllMovies(sort, userId).then((result) => {
        return res.status(200).json(result)
    }).catch(next)
}

exports.voteMovie = function(req, res, next) {
    let movieId = req.params.movieId
    return requestValidator.voteValidate(req.body).then((result) => {
        log.info(`[PUT /api/vote/][vote: ${result.vote}]`)
        return moviesService.voteMovie(result.vote, movieId, req.userID)
    }).then((result) => {
        return res.status(200).json(result)
    }).catch(next)
}