const Food = require('../models/food')
const Recipe = require('../models/recipe')
const axios = require('axios')
require('dotenv').config();

const pry = require('pryjs')


class recipesController {

  static index(req, res, next) {
    const url = `https://api.yummly.com/v1/recipes?_app_id=${process.env.APP_ID}&_app_key=${process.env.APP_KEY}`
    let searchParam
    food = Food.find(req.params.id)
    .then(food => {
      return searchParam = `q=${food.name}`
    })
    .then(searchParam => {
      let fullUrl = `${url}${searchParam}`
      eval(pry.it)
      // axios.get(`${}`)
      // Do something with the food and api
    });
  }
}

module.exports = recipesController;
