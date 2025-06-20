const mongoose = require('mongoose');
const truck = require('./truck');
const userSchema = new mongoose.Schema({
  
  name: String,
  firstName: { type: String },
  lastName: { type: String},
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['citizen', 'collector', 'admin'], default: 'citizen' },
  trucks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }]
}, { collection: 'auth_users' });
module.exports = mongoose.model('User', userSchema);
