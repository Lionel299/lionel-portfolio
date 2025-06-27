const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

// CRUD routes

router.post('/', truckController.createTruck);
router.get('/', truckController.getTrucks);
router.get('/:id', truckController.getTruckById);
router.put('/:id', truckController.updateTruck);
router.delete('/:id', truckController.deleteTruck);

module.exports = router;
