
require('dotenv').config();
const port = process.env.PORT || 3002;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const connectDB = require('./backend/db');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'https://collectam-frontend.vercel.app',
  'http://localhost:8080'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use((req, res, next) => {
  res.header('Vary', 'Origin');
  next();
});

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

//connexion BDD
connectDB();

const authRoutes = require('./backend/routes/auth');

const truckRoutes = require('./backend/routes/truck');

const locationRoutes = require('./backend/routes/location');

const depotRoutes = require('./backend/routes/depot');


// Routes
app.use('/api/depots', depotRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/trucks', truckRoutes);

app.use('/api/location', locationRoutes)

app.use('/api/wastes', require('./backend/routes/waste'));

app.use('/api/collections', require('./backend/routes/collection'));

// lancer le server
server.listen(port, () => console.log("le serveur a demerrer au port  " + port));