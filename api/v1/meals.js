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


module.exports = mealRouter;
