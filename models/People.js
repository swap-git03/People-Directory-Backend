const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  peopleName: { type: String, required: true },
  peopleEmail: { type: String, required: true, unique: true },
  peoplePhone: String,
  peopleDOB: Date,
  peopleAddress: String,
  image: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: () => new Date().setHours(0,0,0,0) } // only date
});

module.exports = mongoose.model('People', peopleSchema);
