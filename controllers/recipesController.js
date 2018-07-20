const RecipeService = require('../services/RecipeService')
const RecipeModel = require('../models/recipeModel')

class recipesController {

  static async index(req, res, next) {
    let recipes

    try {
      recipes = await RecipeService.getRecipes(req)

      const responseRecipes = (recipes) => {
        return RecipeModel.format(recipes)
      }
      return res.status(200).json(responseRecipes(recipes))
    }
    catch(err) {
      console.log(err)
    }

    // const responseRecipes = (recipes) => {
    //   return RecipeModel.format(recipes)
    // }
    //
    // return res.status(200).json(responseRecipes(recipes))
  }
}

module.exports = recipesController;
