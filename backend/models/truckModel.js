const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  registration: { type: String, required: true, unique: true },
  maxWeight: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['available', 'on-duty', 'maintenance'], default: 'available' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Truck', truckSchema);

