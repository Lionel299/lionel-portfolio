const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

// CRUD routes

router.post('/trucks', truckController.createTruck);
router.get('/trucks', truckController.getTrucks);
router.get('/trucks/:id', truckController.getTruckById);
router.put('/trucks/:id', truckController.updateTruck);
router.delete('/trucks/:id', truckController.deleteTruck);

module.exports = router;
