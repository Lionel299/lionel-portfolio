const express = require('express');
const router = express.Router();
const { saveLocation, getAllLocations } = require('../controllers/locationController');

router.post('/saveLocation', saveLocation);
router.get('/all', getAllLocations);

module.exports = router;



