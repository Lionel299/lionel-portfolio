const Location = require('../models/locationModel'); // adapte le chemin si besoin

// Enregistrer une nouvelle localisation
exports.saveLocation = async (req, res) => {
  try {
    const { deviceId, latitude, longitude } = req.body;
    const location = new Location({ deviceId, latitude, longitude });
    await location.save();
    res.status(201).json({ message: 'Localisation enregistrée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer toutes les localisations enregistrées
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};



