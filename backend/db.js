const mongoose = require('mongoose');

const username = encodeURIComponent('nkomhalionel');
const password = encodeURIComponent('12novembre2006');
const clusterUrl = 'app-js-fullstack.ija8ufs.mongodb.net';
const dbName = 'App-js-fullstack'; // Remplacez par votre base

const MONGO_URI = `mongodb+srv://${'nkomhalionel'}:${'12novembre2006'}@${'app-js-fullstack.ija8ufs.mongodb.net'}/${'App-js-fullstack'}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
