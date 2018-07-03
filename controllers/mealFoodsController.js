const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const MealFoods = require('../models/mealFoods')

class mealFoodsController {

  static create(req, res, next) {
    if(!req.params.mealId || !req.params.id) {
      return res.status(400).send({
        error: "Please provide both Meal ID and Food ID"
      });
    } else {
      return MealFoods.create(req.params.mealId, req.params.id)
      .then(response => {
        res.status(201).json({
          message: `Successfully added ${response.mealName} to ${response.foodName}`
        });
      })
    }
  }

  static destroy(req, res, next) {
    let responseMealFood;
    if(!req.params.mealId || !req.params.id) {
      return res.status(404).send({
        error: 404,
        message: "Invalid Meal or Food ID"
      })
    } else {
      MealFoods.getMessage(req.params.mealId, req.params.id)
      .then(mealfoods => responseMealFood = mealfoods)
      .then(mealfoods => {
        return MealFoods.destroy(req.params.mealId, req.params.id)
      })
      .then(response => {
        res.status(201).json({
          message: `Successfully removed ${responseMealFood.foodName} from ${responseMealFood.mealName}`
        })
      })
    }
  }
}

module.exports = mealFoodsController
