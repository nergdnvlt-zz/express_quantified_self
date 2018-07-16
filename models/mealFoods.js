const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const Food = require('../models/food')

const pry = require('pryjs')

class MealFoods {

  static favoriteFoods(){
    return database('mealfoods')
    .select('food_id')
    .groupBy('food_id')
    .count('food_id')
    .orderBy('count', 'DESC')
  }

  static getOccurances(foods){
    let foodIds = []
    foods.forEach(function(food) {
      if(food.count == foods[0].count) {
        foodIds.push(food.food_id)
      }
    })
    return foodIds
  }

  static mealAndFoods(foodIds){
    let mealAndFoods = []
    foodIds.forEach(function(food) {
      mealAndFoods.push(database('mealfoods')
        .select({mealName: 'meals.name'}, {foodName: 'foods.name'})
        .where({food_id: food.id})
        .join('meals', {'meals.id': 'mealfoods.meal_id'})
        .join('foods', {'foods.id': 'mealfoods.food_id'})
        .first())
    })
    return mealAndFoods
  }

  static create(mealId, foodId) {
    return database('mealfoods').insert({
      meal_id: mealId,
      food_id: foodId
    })

    .then(mealAndFood => {
      return database('mealfoods')
      .select({mealName: 'meals.name'}, {foodName: 'foods.name'})
      .where({meal_id: mealId, food_id: foodId})
      .join('meals', {'meals.id': 'mealfoods.meal_id'})
      .join('foods', {'foods.id': 'mealfoods.food_id'})
      .first()
    })
  }

  static getMessage(mealId, foodId) {
    return database('mealfoods')
      .select({'mealName': 'meals.name'}, {'foodName': 'foods.name'})
      .where({'meal_id': mealId, 'food_id': foodId})
      .join('meals', {'meals.id': 'mealfoods.meal_id'})
      .join('foods', {'foods.id': 'mealfoods.food_id'})
      .first()
  }

  static destroy(mealId, foodId) {
    return database('mealfoods')
    .where({'meal_id': mealId})
    .andWhere({'food_id': foodId})
    .del()
  }
}

module.exports = MealFoods
