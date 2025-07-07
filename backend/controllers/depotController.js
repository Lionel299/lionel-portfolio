const Depot = require('../models/depotModel')

// Ajouter un point de dépôt
exports.addDepot = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body
    if (!name || !latitude || !longitude) {
      return res.status(400).json({ error: 'Champs manquants' })
    }

    const newDepot = new Depot({ name, latitude, longitude })
    await newDepot.save()

    res.status(201).json({ message: 'Point de dépôt ajouté', depot: newDepot })
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Récupérer tous les dépôts
exports.getAllDepots = async (req, res) => {
  try {
    const depots = await Depot.find()
    res.json(depots)
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Supprimer un dépôt
exports.deleteDepot = async (req, res) => {
  try {
    const { id } = req.params
    await Depot.findByIdAndDelete(id)
    res.json({ message: 'Point de dépôt supprimé' })
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
