const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

// CRUD
router.post('/', wasteController.createWaste);         // Créer un déchet
router.get('/', wasteController.getWastes);            // Lister tous les déchets
router.get('/:id', wasteController.getWasteById);      // Détail d’un déchet
router.put('/:id', wasteController.updateWaste);       // Modifier un déchet
router.delete('/:id', wasteController.deleteWaste);    // Supprimer un déchet

module.exports = router;
