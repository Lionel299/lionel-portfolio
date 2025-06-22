
const port = 3000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const connectDB = require('./db');
require('dotenv').config();
const cors = require('cors');

const allowedOrigins = [
  'https://collectam-frontend.vercel.app',
  'http://localhost:3000' // pour le dev local
];

const corsOptions = {
  origin: function(origin, callback) {
    // autorise les requêtes sans origin (ex: Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, origin); // autorise l'origine spécifique
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // autorise les cookies et credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // pour compatibilité avec certains navigateurs
};

// Ajout de l'en-tête Vary pour la bonne mise en cache
app.use((req, res, next) => {
  res.header('Vary', 'Origin');
  next();
});

// Middleware CORS global
app.use(cors(corsOptions));


const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  socket.on('newLocation', (data) => {
    // data = { id, lat, lng }
    io.emit('updateLocation', data) // Diffuse à tous les clients
  })
})

const authRoutes = require('./routes/auth');
const truckRoutes = require('./routes/truck');
const locationRoutes = require('./routes/location');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/location', locationRoutes)
app.use('/api/wastes', require('./routes/Waste'));
app.use('/api/collections', require('./routes/Collection'));
// Ajouter les autres routes...


//connexion BDD
connectDB();

// lancer le server
server.listen(port, () => console.log("le serveur a demerrer au port  " + port));