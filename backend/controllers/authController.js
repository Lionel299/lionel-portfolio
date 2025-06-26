const User = require('../models/userModel');
const Truck = require('../models/truckModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, mot de passe et rôle sont obligatoires' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
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
      email: email.toLowerCase(),
      address,
      neighborhood,
      phone,
      password: hashedPassword,  // Assure-toi que dans ton modèle le champ s'appelle bien "password"
      trucks: []
    });

    await user.save();

    // Si collecteur avec véhicule, créer le véhicule et lier à l'utilisateur
    if (role === 'collector' && hasVehicle === true && vehicle) {
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

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe sont obligatoires' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

