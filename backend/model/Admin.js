const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Admin = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: 'admins'
})

module.exports = mongoose.model('Admin', Admin)