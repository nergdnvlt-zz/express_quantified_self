const express = require('express');
const foodRouter = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const pry = require('pryjs')
const Food = require('../../models/food')


//Get All
foodRouter.get('/', function(req, res, next) {
  Food.all()
  .then(foods => {
    if(!foods) {
      return res.sendStatus(404);
    } else {
     return res.json(foods);
    }
  });
});


//Get Single Route
foodRouter.get('/:id', function(req, res, next) {
  let foodId = req.params.id
  Food.find(foodId)
  .then(food => {
    if(!food || food.length < 1) {
      return res.sendStatus(404);
    } else {
     return res.json(food);
    }
  });
});


//Create Route
foodRouter.post('/', function(req, res, next) {
  let food = req.body.food

  if(!food.name || !food.calories) {
    return res.status(400).send({
      error: "Please provide both name and calories"
    })
  } else {
    Food.create(food)
    .then(foods => {
      res.status(201).json(foods[0])
    });
  }
});


//Update route
foodRouter.patch('/:id', function(req, res, next) {
  let food = {id: req.params.id, name: req.body.name, calories: req.body.calories}

  if(!food.name || !food.calories) {
    return res.status(400).send({
      error: "Please provide both name and calories"
    })
  } else {
    Food.update(food)
    .then(foods => {
      res.status(201).json(foods)
    });
  }
});


// Delete Path
foodRouter.delete('/:id', function(req, res, next) {
  let idForDeletion = req.params.id

  if(!idForDeletion) {
    return res.status(404).send({
      error: 404,
      message: "No food with that ID"
    })
  } else {
    Food.destroy(idForDeletion)
    .then(food => {
      if(!food){
        res.status(404).json({
          error: 404,
          message: 'There is no food with that ID'
        })
      } else {
        res.status(201).json({
          message: `Deleted food with id of ${idForDeletion}`
        });
      }
    });
  }
});


module.exports = foodRouter;
