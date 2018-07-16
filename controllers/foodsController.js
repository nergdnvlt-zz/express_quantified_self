const Food = require('../models/food')
const Recipe = require('../models/recipe')
const got = require('got');

class foodsController {

  static index(req, res, next) {
    Food.all()
    .then(foods => {
      return res.json(foods);
    });
  }

  static show(req, res, next) {
    let foodId = req.params.id

    Food.find(foodId)
    .then(food => {
      if(!food || food.length < 1) {
        return res.sendStatus(404);
      } else {
       return res.json(food);
      }
    });
  }

  static create(req, res, next) {
    let food = req.body.food

    if(!food.name || !food.calories) {
      return res.status(400).send({
        error: "Please provide both name and calories"
      });
    } else {
      Food.create(food)
      .then(food => {
        res.status(201).json(food);
      });
    }
  }

  static update(req, res, next) {
    let food = {id: req.params.id, name: req.body.food.name, calories: req.body.food.calories}

    if(!food.name || !food.calories) {
      return res.status(400).send({
        error: "Please provide both name and calories"
      });
    } else {
      Food.update(food)
      .then(food => {
        res.status(201).json(food)
      });
    }
  }

  static destroy(req, res, next) {
    let idForDeletion = req.params.id
    Food.destroy(idForDeletion)
    .then(food => {
      if(!food){
        res.status(404).json({
          error: 404,
          message: 'There is no food with that ID'
        });
      } else {
        res.status(201).json({
          message: `Deleted food with id of ${idForDeletion}`
        });
      }
    });
  }

  static recipes(req, res, next){
    let foodId = req.params.id

    Food.find(foodId)
    got('http://api.yummly.com/v1', { json: true })
    .then(response => {
      console.log(response.body.url);
      console.log(response.body.explanation);
    }).catch(error => {
      console.log(error.response.body);
    });
  }
}

module.exports = foodsController;
