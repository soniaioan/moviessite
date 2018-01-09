const express = require('express');
const router = express.Router();
const root = process.cwd()
const path = root + '/views/';
const loginController = require(root + '/lib/controllers/loginController')
const signupController = require(root + '/lib/controllers/signupController')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path + 'index.html');
});
/* GET loginpage. */
router.get('/login', function(req, res, next) {
    res.sendFile(path + 'login.html');
});
/* GET signuppage. */
router.get('/signup', function(req, res, next) {
    res.sendFile(path + 'signup.html');
});

/* GET add movie. */
router.get('/add', function(req, res, next) {
    res.sendFile(path + 'add.html');
});

/* GET home. */
router.get('/home', function(req, res, next) {
    res.sendFile(path + 'home.html');
});

/* GET user movies. */
router.get('/user/:userId', function(req, res, next) {
    res.sendFile(path + 'user.html');
});

module.exports = router;
