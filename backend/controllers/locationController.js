

const Location = require('../models/Location'); // chemin vers ton modèle

exports.saveLocation = async (req, res) => {
  try {
    const { deviceId, latitude, longitude } = req.body
    const location = new Location({ deviceId, latitude, longitude })
    await location.save()
    res.status(201).json({ message: 'Localisation enregistrée' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
}



