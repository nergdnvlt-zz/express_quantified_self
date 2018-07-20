const Food = require('../models/food');
const axios = require('axios');
require('dotenv').config();

const pry = require('pryjs')

class recipesController {

  static index(req, res, next) {
    let recipes = [];
    const baseUrl = `https://api.yummly.com/v1/api/recipes?_app_id=${process.env.APP_ID}&_app_key=${process.env.APP_KEY}`
    let searchParam

    let food = Food.find(req.params.id)
    .then(food => {
      let fullUrl = `${baseUrl}&q=${food.name}`
      return axios.get(`${fullUrl}`)
    })
    .then(food_response =>  {
      return food_response.data.matches
    })
    .then(rawRecipes => {
      rawRecipes.forEach(recipe => {
        return recipes.push({"name": recipe.recipeName, "url": `http://www.yummly.co/recipe/${recipe.id}`})
      })
      return { "recipes": recipes }
    })
    .then(recipes => {
      return res.status(200).json(recipes)
    })
  }
}

module.exports = recipesController;
