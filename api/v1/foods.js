const express = require('express');
const foodRouter = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

foodRouter.get('/', function(req, res, next) {
  database.raw('SELECT * FROM foods').
  then(function(foods) {
    if(!foods.rows) {
      return res.sendStatus(404);
    } else {
     return res.json(foods.rows);
    }
  })
});

foodRouter.get('/:id', function(req, res, next) {
  var id = req.params.id
  database.raw('SELECT * FROM foods WHERE id = ?', [id]).
  then(function(foods) {
    if(!foods.rows) {
      return res.sendStatus(404);
    } else {
     return res.json(foods.rows);
    }
  })
});

foodRouter.post('/', function(req, res, next) {
  var name = req.body.name
  var calories = req.body.calories
  console.log(name)
  console.log(calories)

  if(!name && !calories) {
    return res.status(400).send({
      error: "Please provide both name and calories"
    })
  } else {
    database.raw('INSERT INTO foods (name, calories) VALUES (?,?) RETURNING *', [name, calories]).
    then(function(foods) {
      res.status(201).json(foods.rows[0])
    })
  }
})


module.exports = foodRouter;
