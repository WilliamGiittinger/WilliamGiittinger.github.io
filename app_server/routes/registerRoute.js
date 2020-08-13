const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerControl');

/* GET register page */
router.get('/', controller.registerDisplay);

/* POST for new users */
router.post('/', controller.registerUser);

module.exports = router;