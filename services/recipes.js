const Food = require('../models/food');
const axios = require('axios');
require('dotenv').config();

const pry = require('pryjs')


class RecipeService {

  static async getRecipes(req) {
    const url = `https://api.yummly.com/v1/api/recipes?_app_id=${process.env.APP_ID}&_app_key=${process.env.APP_KEY}`
    // let searchParam
    // food = Food.find(req.params.id)
    // .then(food => {
    //   return searchParam = `&q=${food.name}`
    // })
    // .then(searchParam => {
    //   let fullUrl = `${url}${searchParam}`
    //   return axios.get(`${fullUrl}`)
    // })
    // .then(response =>  response.data.matches)
    // .catch(error => error)

    let food = await Food.find(req.params.id)
    let searchParam = `&q=${food.name}`
    let fullUrl = `${url}${searchParam}`
    return axios.get(`${fullUrl}`)
    .then(response =>  response.data.matches)
    .catch(error => error)
  }
}

module.exports = RecipeService;
