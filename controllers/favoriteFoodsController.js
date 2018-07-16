const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const Food = require('../models/food')
const MealFood = require('../models/mealFoods')

const pry = require('pryjs')


class favoriteFoodsController {

  static index(req, res, next){
    let total
    let foodObjs = []
    Food.favorites()
    .then(foods => {
      return Food.eval(foods.rows)
    })
    // .then(foods => {
    //   foods.forEach(function(food) {
    //     Food.getFoodMeals(food.id)
    //   })
    // })
    .then(foods => {
      total = foods[0].timeseaten
      foods.forEach(function(food) {
        foodObjs.push({name: food.name, calories: food.calories})
      })
      return foodObjs
    })
    .then(foods => {
      return res.json(
        {
          "timesEaten": total,
          "foods": foodObjs
        }
      )
    })
  }
}

module.exports = favoriteFoodsController;
