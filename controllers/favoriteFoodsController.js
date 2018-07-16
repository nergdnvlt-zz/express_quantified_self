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
    let end_foods = []
    Food.favorites()
    .then(foods => {
      return Food.eval(foods.rows)
    })
    // .then(foods => {
    //   total = foods[0].timeseaten
    //   foods.forEach(function(food) {
    //     foodObjs.push({name: food.name, calories: food.calories})
    //   })
    //   return foodObjs
    // })
    .then(foods => {
      total = foods[0].timeseaten
      foods.forEach(function(food) {
        let meal_arr = []
        Food.getFoodMeals(food.id)
        .then(meals => {
          let mealNames = meals.rows
          mealNames.forEach(function(meal) {
            meal_arr.push(meal.name)
          })
          return meal_arr
        })
        .then(meal_arr => {
          return foodObjs.push({name: food.name, calories: food.calories, meals: meal_arr})
        })
        .then(foods => {
          return res.json(
            {
              "timesEaten": total,
              "foods": foodObjs
            }
          )
        })
    })
  })
  }
}

module.exports = favoriteFoodsController;
