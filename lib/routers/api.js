const express = require('express');
const router = express.Router();
const root = process.cwd()
const signupController = require(root + '/lib/controllers/signupController')
const loginController = require(root + '/lib/controllers/loginController')
const moviesController = require(root + '/lib/controllers/moviesController')
const auth = require(root +'/lib/middleware/auth')

router.post('/api/signup', signupController.signup)
router.post('/api/login', loginController.login)
router.get('/api/movies/user/:userId', auth, moviesController.getMoviesOfUser )
router.post('/api/movies', auth, moviesController.addMovie )
router.get('/api/movies/all', moviesController.getAllMovies)
router.get('/api/movies?', auth, moviesController.getAllMovies)
router.put('/api/vote/:movieId', auth, moviesController.voteMovie)
module.exports = router;
