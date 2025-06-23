const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { saveLocation } = require('./controllers/locationController');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

// Liste blanche des origines autorisées
const allowedOrigins = [
  'http://localhost:8080',
  'https://collectam-frontend.vercel.app'
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Origine non autorisée par la politique CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Connexion MongoDB avec cache global
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

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

// Middleware pour connecter à la base avant les routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    console.log('Connexion DB établie');
    next();
  } catch (error) {
    console.error('Erreur connexion DB:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route POST pour enregistrer la localisation
app.post('/api/location/saveLocation', saveLocation);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
