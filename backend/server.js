
const port = 3000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const connectDB = require('./db');
require('dotenv').config();
const cors = require('cors');

const allowedOrigins = ['https://collectam-frontend.vercel.app', 'http://localhost:3000']; // ajoute localhost pour dev

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // autorise Postman ou serveurs sans origin
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `L'origine ${origin} n'est pas autorisée par CORS.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Gestion des requêtes OPTIONS (preflight)
app.options('*catchall', cors(corsOptions));


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