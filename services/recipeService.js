const Food = require('../models/food');
const axios = require('axios');
require('dotenv').config();

class RecipeService {
  static async getRecipes(req) {
    const baseUrl = `https://api.yummly.com/v1/api/recipes?_app_id=${process.env.APP_ID}&_app_key=${process.env.APP_KEY}`
    let food

    try {
      food = await Food.find(req.params.id)
      return axios.get(`${baseUrl}&q=${food.name}`)
      .then(recipes => recipes.data.matches)
      .catch(error => error)
    }
    catch(err) {
      console.log(err)
    }
    // return axios.get(`${baseUrl}&q=${food.name}`)
    // .then(recipes => recipes.data.matches)
    // .catch(error => error)
  }
}

module.exports = RecipeService;
