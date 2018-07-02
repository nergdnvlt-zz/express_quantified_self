const express = require('express');
const foodRouter = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const pry = require('pryjs')



//Get All
foodRouter.get('/', function(req, res, next) {
  database.select().from('foods')
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
  var foodId = req.params.id

  database('foods').where({id: foodId}).limit(1)
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
  var incomingName = req.body.name
  var incomingCalories = req.body.calories

  if(!incomingName || !incomingCalories) {
    return res.status(400).send({
      error: "Please provide both name and calories"
    })
  } else {
    database('foods').insert({
      name: incomingName,
      calories: incomingCalories
    })
    .returning('*')
    .limit(1)
    .then(foods => {
      res.status(201).json(foods)
    });
  }
});


//Update route
foodRouter.patch('/:id', function(req, res, next) {
  var incomingId = req.params.id
  var updatedName = req.body.name
  var updatedCalories = req.body.calories

  if(!updatedName || !updatedCalories) {
    return res.status(400).send({
      error: "Please provide both name and calories"
    })
  } else {
    database('foods').where({id: incomingId}).update({
      name: updatedName,
      calories: updatedCalories
    })
    .returning('*')
    .limit(1)
    .then(foods => {
      res.status(201).json(foods)
    });
  }
});


// Delete Path
foodRouter.delete('/:id', function(req, res, next) {
  var idForDeletion = req.params.id

  if(!idForDeletion) {
    return res.status(404).send({
      error: 404,
      message: "No food with that ID"
    })
  } else {
    database('foods').where({id: idForDeletion}).del()
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
