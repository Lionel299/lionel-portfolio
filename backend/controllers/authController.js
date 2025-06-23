// controllers/authController.js
const User = require('../models/user');
const Truck = require('../models/truck');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const {
      role,
      firstName,
      lastName,
      email,
      address,
      neighborhood,
      phone,
      password,
      hasVehicle,
      vehicle
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer et sauvegarder l'utilisateur
    const user = new User({
      role,
      firstName,
      lastName,
      email,
      address,
      neighborhood,
      phone,
      password: hashedPassword,
      trucks: [] // initialisation du tableau trucks
    });

    await user.save();

    // Si c'est un collecteur avec véhicule, créer le véhicule et lier à l'utilisateur
    if (role === 'collector' && hasVehicle && vehicle) {
      const newTruck = new Truck({
        brand: vehicle.brand,
        registration: vehicle.registration,
        maxWeight: vehicle.maxWeight,
        owner: user._id
      });
      await newTruck.save();

      user.trucks.push(newTruck._id);
      await user.save();
    }

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });

    // Tu peux ici générer un token JWT si besoin
    res.json({ message: 'Connexion réussie', user: { email: user.email, role: user.role, firstName: user.firstName } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
