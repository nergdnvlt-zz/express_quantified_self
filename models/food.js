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
    // return database('foods')
    // .select({'mealName': 'meals.name'}, {'foodName': 'foods.name'}, {'foodCalories': 'foods.calories'})
    // .join('mealfoods', {'foods.id': 'mealfoods.food_id'})
    // .join('meals', {'mealfoods.meal_id': 'meals.id'})
    // .orderBy('foodName')
    return database.raw('SELECT foods.id, foods.name as foodName, foods.calories, meals.name as mealName, count(foods.id) FROM foods JOIN mealfoods on foods.id=mealfoods.food_id JOIN meals ON mealfoods.meal_id=meals.id GROUP BY ;')
  }

}

module.exports = Food
