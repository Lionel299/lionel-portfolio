
const port = 3000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const connectDB = require('./db');
require('dotenv').config();

const io = socketIo(server, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  socket.on('newLocation', (data) => {
    // data = { id, lat, lng }
    io.emit('updateLocation', data) // Diffuse à tous les clients
  })
})

const authRoutes = require('./routes/auth');
const truckRoutes = require('./routes/truck');
const locationRoutes = require('./routes/location');

const cors = require('cors');
app.use(cors({ origin: 'https://https://collectam-frontend.vercel.app' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use('/api/auth', authRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/', locationRoutes)
app.use('/api/wastes', require('./routes/Waste'));
app.use('/api/collections', require('./routes/Collection'));
// Ajouter les autres routes...


//connexion BDD
connectDB();

// lancer le server
app.listen(port, () => console.log("le serveur a demerrer au port  " + port));