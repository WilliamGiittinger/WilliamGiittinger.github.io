const express = require('express');
const router = express.Router();
const controler = require('../controllers/indexControl');

/* GET index page */
router.get('/', controler.index);

module.exports = router;