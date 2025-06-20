const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD
router.post('/', userController.createUser);         // Créer un utilisateur
router.get('/', userController.getUsers);            // Lister tous les utilisateurs
router.get('/:id', userController.getUserById);      // Détail d’un utilisateur
router.put('/:id', userController.updateUser);       // Modifier un utilisateur
router.delete('/:id', userController.deleteUser);    // Supprimer un utilisateur

module.exports = router;