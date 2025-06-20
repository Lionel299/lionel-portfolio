const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  deviceId: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
}, { collection: 'position' })

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
