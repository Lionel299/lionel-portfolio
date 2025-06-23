
const port = 3000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const connectDB = require('./backend/db');
require('dotenv').config();
const cors = require('cors');

// Initialisation de Socket.IO avec le serveur HTTP
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:8080', // même origine que CORS Express
    methods: ['GET', 'POST']
  }
});

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // Pour compatibilité avec certains navigateurs
};

app.use(cors(corsOptions));

io.on('connection', (socket) => {
  socket.on('newLocation', (data) => {
    // data = { id, lat, lng }
    io.emit('updateLocation', data) // Diffuse à tous les clients
  })
})

const authRoutes = require('./backend/routes/auth');
const truckRoutes = require('./backend/routes/truck');
const locationRoutes = require('./backend/routes/location');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/location', locationRoutes)
app.use('/api/wastes', require('./backend/routes/Waste'));
app.use('/api/collections', require('./backend/routes/Collection'));
// Ajouter les autres routes...


//connexion BDD
connectDB();

module.exports = app;