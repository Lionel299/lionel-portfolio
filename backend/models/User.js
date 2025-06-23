const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  
  firstName: { type: String },
  lastName: { type: String},
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['citizen', 'collector', 'admin'], default: 'citizen' },
  trucks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }]
}, { collection: 'auth_users' });
module.exports = mongoose.model('User', userSchema);
