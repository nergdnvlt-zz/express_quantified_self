const express = require('express');
const mealRouter = express.Router();

const mealsController = require('../../controllers/mealsController')
const mealFoodsController = require('../../controllers/mealFoodsController')

// Restful API Routes for Meals

// Gets all meals
mealRouter.get('/', mealsController.index)

// Gets single meal
mealRouter.get('/:id/foods', mealsController.show)



// Restful API Routes for MealsFoods which is a relationship between meals and foods

// Creates new food
mealRouter.post('/:mealId/foods/:id', mealFoodsController.create)

// Deletes Existing Food
mealRouter.delete('/:mealId/foods/:id', mealFoodsController.destroy)


module.exports = mealRouter;
