const mongoose = require('mongoose');
const collectionSchema = new mongoose.Schema({
  waste: { type: mongoose.Schema.Types.ObjectId, ref: 'Waste' },
  collector: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  status: { type: String, enum: ['planned', 'done'], default: 'planned' }
});
module.exports = mongoose.model('Collection', collectionSchema);
