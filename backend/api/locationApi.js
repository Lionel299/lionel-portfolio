const mongoose = require('mongoose');
const { saveLocation } = require('../controllers/locationController');

// Cache global pour la connexion
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

const MONGODB_URI = process.env.MONGODB_URI;

// Liste blanche des origines autorisées
const allowedOrigins = [
  'http://localhost:8080', // dev local
  'https://collectam-frontend-e29zowplv-lionels-projects-61e91f4d.vercel.app'
];

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(mongoose => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = async (req, res) => {
  const origin = req.headers.origin;

  // Vérifie si l'origine est dans la liste blanche
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Répondre aux pré-requêtes CORS
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    await connectToDatabase();
    console.log('Connexion DB établie');

    const { latitude, longitude, deviceId } = req.body;
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Latitude et longitude doivent être des nombres valides' });
    }

    const position = await saveLocation({ latitude, longitude, deviceId });
    console.log('Position enregistrée:', position);

    res.status(200).json({ message: 'Position enregistrée', position });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
