const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// CRUD
router.post('/', collectionController.createCollection);         // Créer une collecte
router.get('/', collectionController.getCollections);            // Lister toutes les collectes
router.get('/:id', collectionController.getCollectionById);      // Détail d’une collecte
router.put('/:id', collectionController.updateCollection);       // Modifier une collecte
router.delete('/:id', collectionController.deleteCollection);    // Supprimer une collecte

module.exports = router;
