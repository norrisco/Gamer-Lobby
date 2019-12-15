const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Games = new Schema({
  title: {
    type: String
  },
  platform: {
    type: String
  },
  genre: {
    type: String
  },
  rating: {
    type: String
  },
  publisher: {
    type: String
  },
  release: {
    type: String
  },
  status: {
    type: String
  }

}, {
  collection: 'games'
});

module.exports = mongoose.model('Games', Games);