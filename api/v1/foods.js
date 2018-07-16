const express = require('express');
const foodRouter = express.Router();

const foodsController = require('../../controllers/foodsController')

// Restful API Routes for foods

// Gets all foods
foodRouter.get('/', foodsController.index)

// Gets single food
foodRouter.get('/:id', foodsController.show)

// API CONSUMPTION - Non restful route
foodRouter.get('/:id/recipes', foodsController.recipes)

// Creates new food
foodRouter.post('/', foodsController.create)

// Updates current food
foodRouter.patch('/:id', foodsController.update)
foodRouter.put('/:id', foodsController.update)

// Deletes Existing Food
foodRouter.delete('/:id', foodsController.destroy)



module.exports = foodRouter;
