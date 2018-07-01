const express = require('express');

const mealRouter = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

mealRouter.get('/', function(req, res, next) {
  database.raw('SELECT * FROM meals').
  then(function(meals) {
    if(!meals.rows) {
      return res.sendStatus(404);
    } else {
     return res.json(meals.rows);
    }
  })
});

mealRouter.get('/:id', function(req, res, next) {
  var id = req.params.id
  database.raw('SELECT * FROM meals WHERE id = ?', [id]).
  then(function(meals) {
    if(!meals.rows || meals.rows.length < 1) {
      return res.sendStatus(404);
    } else {
     return res.json(meals.rows);
    }
  })
});


module.exports = mealRouter;
