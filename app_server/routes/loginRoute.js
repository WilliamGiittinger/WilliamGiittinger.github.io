const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginControl');
const passport = require('passport');

/* GET register page */
router.get('/', controller.loginDisplay);

/* POST to login user */
router.post('/', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;