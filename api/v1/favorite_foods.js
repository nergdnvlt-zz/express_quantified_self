const express = require('express');
const favoriteFoodsRouter = express.Router();

const favoriteFoodsController = require('../../controllers/favoriteFoodsController')

// Restful API Routes for favorite foods

// Gets all foods
favoriteFoodsRouter.get('/', favoriteFoodsController.index)

module.exports = favoriteFoodsRouter;
