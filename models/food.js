const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const pry = require('pryjs')

class Food {
  static all(){
    return database('foods').select('id', 'name', 'calories')
  }

  static find(id){
    return database('foods').where('id', id).select('id', 'name', 'calories').limit(1)
    .then(foods => {
      return foods[0];
    });
  }

  static create(food){
    return database('foods').insert({
      name: food.name,
      calories: food.calories
    })
    .returning('*')
    .limit(1)
    .then(foods => {
      return foods[0];
    })
  }

  static update(food) {
    return database('foods').where({id: food.id}).update({
      name: food.name,
      calories: food.calories
    })
    .returning('*')
    .limit(1)
    .then(foods => {
      return foods[0];
    })
  }

  static destroy(foodId) {
    return database('foods').where({id: foodId}).del()
  }

  static favorites() {
    return database.raw('SELECT foods.id, foods.name, foods.calories, COUNT(foods.id) AS timesEaten FROM foods LEFT JOIN mealfoods ON foods.id = mealfoods.food_id GROUP BY foods.id ORDER BY timesEaten DESC;')
  }

  static eval(foods) {
    let end_array = []
    let top = foods[0].timeseaten
    foods.forEach(function(food) {
      if(food.timeseaten == top) {
        end_array.push(food)
      }
    })
    return end_array
  }

  static getFoodMeals(food){
    return database.raw('SELECT meals.name FROM foods JOIN mealfoods ON foods.id = mealfoods.food_id JOIN meals ON mealfoods.meal_id = meals.id WHERE foods.id = ?;', food.id)
  }
}

module.exports = Food
