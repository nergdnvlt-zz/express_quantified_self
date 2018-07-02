const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {
  static all(){
    return database('foods').select('id', 'name', 'calories')
  }

  static find(id){
    return database('foods').where('id', id).select('id', 'name').limit(1)
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

}

module.exports = Food
