const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/saveLocation', locationController.saveLocation);

module.exports = router;


