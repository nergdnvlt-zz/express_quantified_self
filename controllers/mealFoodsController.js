const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class mealFoodsController {

  static create(req, res, next) {
    if(!req.params.mealId || !req.params.id) {
      return res.status(400).send({
        error: "Please provide both Meal ID and Food ID"
      });
    } else {
      database('mealfoods').insert({
        meal_id: req.params.mealId,
        food_id: req.params.id
      })
      .then(mealAndFood => {
        return database('mealfoods')
        .select({mealName: 'meals.name'}, {foodName: 'foods.name'})
        .where({meal_id: req.params.mealId, food_id: req.params.id})
        .join('meals', {'meals.id': 'mealfoods.meal_id'})
        .join('foods', {'foods.id': 'mealfoods.food_id'})
        .first()
      })
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
      return database('mealfoods')
        .select({'mealName': 'meals.name'}, {'foodName': 'foods.name'})
        .where({'meal_id': req.params.mealId, 'food_id': req.params.id})
        .join('meals', {'meals.id': 'mealfoods.meal_id'})
        .join('foods', {'foods.id': 'mealfoods.food_id'})
        .first()
      .then(mealfood => {
        responseMealFood = mealfood })
      .then(deleteIt => {
        return database('mealfoods')
        .where({meal_id: req.params.mealId})
        .andWhere({food_id: req.params.id})
        .del()
      })
      .then(response => {
        console.log(response)
        res.status(201).json({
          message: `Successfully removed ${responseMealFood.foodName} from ${responseMealFood.mealName}`
        })
      })
    }
  }
}
module.exports = mealFoodsController
