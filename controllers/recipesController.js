const Food = require('../models/food');
const RecipeService = require('../services/recipes');
require('dotenv').config();

const pry = require('pryjs')

class recipesController {

  static async index(req, res, next) {
    let rawRecipes = await RecipeService.getRecipes(req)
    let recipes
    eval(pry.it)
    const formattedRecipes = (rawRecipes) => {
      recipes = rawRecipes.map(recipe => {
        return {"name": recipe.recipeName, "url": `http://www.yummly.co/recipe/${recipe.id}`}
      })
      return { "recipes": recipes }
    }
    return res.status(200).json(formatRecipes(recipes))
  }
}

module.exports = recipesController;
