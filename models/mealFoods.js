const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class MealFoods {
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
