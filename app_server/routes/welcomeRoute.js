const express = require('express');
const router = express.Router();
const controller = require('../controllers/welcomeControl');

/* GET welcome page */
router.get('/', controller.welcomeDisplay);

/* POST for loading sample animal data
   POST for removing animal data given id 
   POST for inserting animal data
   POST for displaying animals in DB
   POST for displaying animals in BinaryTree */
router.post('/initializeBST', controller.initializeBST);
router.post('/removeBST', controller.removeBST);
router.post('/removeDB', controller.removeDB);
router.post('/insertDB', controller.insertDB);
router.post('/insertBST', controller.insertBST);
router.post('/displayDB', controller.displayDB);
router.post('/displayBST', controller.displayBST);

module.exports = router;