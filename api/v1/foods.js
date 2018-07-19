const express = require('express');
const foodRouter = express.Router();

const foodsController = require('../../controllers/foodsController')
const recipesController = require('../../controllers/recipesController')

// Restful API Routes for foods

// Gets all foods
foodRouter.get('/', foodsController.index)

// Gets single food
foodRouter.get('/:id', foodsController.show)

// Creates new food
foodRouter.post('/', foodsController.create)

// Updates current food
foodRouter.patch('/:id', foodsController.update)
foodRouter.put('/:id', foodsController.update)

// Deletes Existing Food
foodRouter.delete('/:id', foodsController.destroy)


// Route for Yummly API Consumption
foodRouter.get('/:id/recipes', recipesController.index)

module.exports = foodRouter;
