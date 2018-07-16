const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const Food = require('../models/food')
const MealFood = require('../models/mealFoods')

const pry = require('pryjs')


class favoriteFoodsController {

  static index(req, res, next){
    Food.favorites()
    .then(foods => {
      Food.eval(foods)
      return res.json(foods.rows)
    })
  }

  // static index(req, res, next) {
  //   let foodObjs = []
  //   let foodCount = []
  //   MealFood.favoriteFoods()
  //   .then(foods => {
  //     foodCount = foods[0].count
  //     return MealFood.getOccurances(foods)
  //   })
  //   .then(foods => {
  //     foods.forEach(function(food) {
  //       Food.find(food)
  //       .then(food => {
  //         foodObjs.push({name: food.name, calories: food.calories})
  //       })
  //       .then(foods => {
  //         return res.json(
  //           {
  //             "timesEaten": foodCount,
  //             "foods": foodObjs
  //           }
  //         )
  //         })
  //       });
  //   });
  // }
}

module.exports = favoriteFoodsController;
