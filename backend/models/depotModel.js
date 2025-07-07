const mongoose = require('mongoose')

const depotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Depot', depotSchema)
