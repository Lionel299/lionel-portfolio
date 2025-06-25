const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  userType: { type: String, enum: ['citizen', 'collector', 'admin'], required: true }, // nouveau champ
  timestamp: { type: Date, default: Date.now }
}, { collection: 'position' })

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
