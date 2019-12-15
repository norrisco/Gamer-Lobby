const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Player = new Schema({
  player_name: {
    type: String
  },
  player_rank: {
    type: String
  },
  player_score: {
    type: String
  },
  player_time: {
    type: String
  },
  games_played: {
    type: Array
  },
  player_status: {
    type: String
  }

}, {
  collection: 'players'
})

module.exports = mongoose.model('Player', Player);