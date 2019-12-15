const express = require('express');
const app = express();
const gamesRoute = express.Router();

// Games model
let Games = require('../model/Games');

// Add Games
gamesRoute.route('/add-games').post((req, res, next) => {
  Games.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all games
gamesRoute.route('/').get((req, res) => {
  Games.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get single games
gamesRoute.route('/read-games/:id').get((req, res) => {
  Games.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Update games
gamesRoute.route('/update-games/:id').put((req, res, next) => {
  Games.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Games successfully updated!')
    }
  })
});

// Delete games
gamesRoute.route('/delete-games/:id').delete((req, res, next) => {
  Games.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

module.exports = gamesRoute;