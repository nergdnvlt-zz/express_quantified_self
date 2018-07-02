const express = require('express');

const mealRouter = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const MealObj = require('../../models/meal')

const pry = require('pryjs')


// Get All
mealRouter.get('/', function(req, res, next) {
  MealObj.all()
  .then(meals => {
    return res.json(meals)
  });
});


// Get Single
mealRouter.get('/:id/foods', function(req, res, next) {
  let id = req.params.id
  MealObj.find(id)
  .then(meal => {
    if(!meal) {
      return res.sendStatus(404);
    } else {
     return res.json(meal);
    }
  })
});


//Create MealFoods
mealRouter.post('/:mealId/foods/:id', function(req, res, next) {
  let incomingMealId = req.params.mealId
  let incomingFoodId = req.params.id

  if(!incomingMealId || !incomingFoodId) {
    return res.status(400).send({
      error: "Please provide both Meal ID and Food ID"
    });
  } else {
    database('mealfoods').insert({
      meal_id: incomingMealId,
      food_id: incomingFoodId
    })
    .then(mealAndFood => {
      return database('mealfoods')
      .select({mealName: 'meals.name'}, {foodName: 'foods.name'})
      .where({meal_id: incomingMealId, food_id: incomingFoodId})
      .join('meals', {'meals.id': 'mealfoods.meal_id'})
      .join('foods', {'foods.id': 'mealfoods.food_id'})
      .first()
    })
    .then(response => {
      res.status(201).json({
        message: `Successfully added ${response.mealName} to ${response.foodName}`
      });
    })
  }
});


//Delete Mealfood table row
mealRouter.delete('/:meal_id/foods/:id', function(req, res, next) {
  let delMealId = req.params.meal_id
  let delFoodId = req.params.id

  if(!delMealId || !delFoodId) {
    return res.status(404).send({
      error: 404,
      message: "Invalid Meal or Food ID"
    })
  } else {
    return database('mealfoods')
      .select({mealName: 'meals.name'}, {foodName: 'foods.name'})
      .where({meal_id: delMealId, food_id: delFoodId})
      .join('meals', {'meals.id': 'mealfoods.meal_id'})
      .join('foods', {'foods.id': 'mealfoods.food_id'})
      .first()
    .then(mealfood =>
      responseMealFood = mealfood
    )
    .then(deleteIt => {
      return database('mealfoods')
      .where({meal_id: delMealId})
      .andWhere({food_id: delFoodId})
      .del()
    })
    .then(response => {
      console.log(response)
      res.status(201).json({
        message: `Successfully removed ${responseMealFood.foodName} from ${responseMealFood.mealName}`
      })
    })
  }
});


module.exports = mealRouter;
