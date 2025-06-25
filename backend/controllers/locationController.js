const Location = require('../models/locationModel'); // adapte le chemin si besoin

// Enregistrer ou mettre à jour une localisation avec userType
exports.saveLocation = async (req, res) => {
  try {
    const { deviceId, latitude, longitude, userType } = req.body;

    if (!deviceId || latitude === undefined || longitude === undefined || !userType) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    // Upsert : créer ou mettre à jour selon deviceId
    await Location.findOneAndUpdate(
      { deviceId },
      { latitude, longitude, userType, timestamp: new Date() },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: 'Localisation enregistrée' });
  } catch (error) {
    console.error(error);
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




