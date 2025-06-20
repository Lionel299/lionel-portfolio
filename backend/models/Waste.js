const mongoose = require('mongoose');
const wasteSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  location: String,
  imageUrl: String,
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'collected'], default: 'pending' }
});
module.exports = mongoose.model('Waste', wasteSchema);
