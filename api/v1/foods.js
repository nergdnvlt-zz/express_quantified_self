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
    if(!foods.rows || foods.rows.length < 1) {
      return res.sendStatus(404);
    } else {
     return res.json(foods.rows);
    }
  })
});

foodRouter.post('/', function(req, res, next) {
  var name = req.body.name
  var calories = req.body.calories

  if(!name || !calories) {
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

foodRouter.patch('/:id', function(req, res, next) {
  var id = req.params.id
  var name = req.body.name
  var calories = req.body.calories

  if(!name || !calories) {
    return res.status(400).send({
      error: "Please provide both name and calories"
    })
  } else {
    database.raw('UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING *', [name, calories, id]).
    then(function(foods) {
      res.status(201).json(foods.rows[0])
    })
  }
})

foodRouter.delete('/:id', function(req, res, next) {
  var id = req.params.id

  if(!id) {
    return res.status(404).send({
      error: "No food with that ID"
    })
  } else {
    database.raw('DELETE FROM foods WHERE id = ?', [id])
    .then(function(foods) {
      res.status(201).json({
        message: `Deleted food with id of ${id}`
      })
    })
  }
})


module.exports = foodRouter;
