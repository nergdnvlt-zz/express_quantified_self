const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

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
   // return database.raw(`SELECT timesEaten, json_agg(json_build_object('name', name, 'calories', calories)) AS foods
   //                      FROM
   //                      (
   //                        SELECT foods.name, foods.calories, COUNT(foods.id) AS timesEaten
   //                        FROM foods
   //                        LEFT JOIN mealfoods ON foods.id = mealfoods.food_id
   //                        GROUP BY foods.id
   //                        ORDER BY timesEaten DESC
   //                      ) joinsQuery
   //                      GROUP BY timesEaten
   //                      ORDER BY timesEaten DESC`)
   return database('foods')
    .select('timesEaten', json_agg(json_build_object('name', name, 'calories', calories)) as foods)
 }

}

module.exports = Food
