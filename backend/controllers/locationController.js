// controllers/locationController.js
const Location = require('../models/locationModel');

exports.saveLocation = async (req, res) => {
  const { latitude, longitude, deviceId, userType } = req.body;

  if (!deviceId) {
    return res.status(400).json({ message: 'deviceId requis.' });
  }

  try {
    // Chercher s'il y a déjà une position pour ce deviceId
    let existingLocation = await Location.findOne({ deviceId });

    if (existingLocation) {
      // Si existe, on met à jour uniquement latitude et longitude
      existingLocation.latitude = latitude;
      existingLocation.longitude = longitude;
      await existingLocation.save();
      return res.status(200).json({ message: 'Position mise à jour.' });
    } else {
      // Si pas encore enregistré, on crée a`vec userType
      const newLocation = new Location({
        latitude,
        longitude,
        deviceId,
        userType,
      });
      await newLocation.save();
      return res.status(201).json({ message: 'Position enregistrée.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
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



