const express = require('express')
const router = express.Router()
const depotController = require('../controllers/depotController')

router.post('/addDepot', depotController.addDepot)
router.get('/all', depotController.getAllDepots)
router.delete('/:id', depotController.deleteDepot)

module.exports = router
