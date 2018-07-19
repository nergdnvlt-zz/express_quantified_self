const Food = require('../models/food');
const Recipe = require('../models/recipe');
const axios = require('axios');
const fetch = require('node-fetch');
require('dotenv').config();

const pry = require('pryjs')


class recipesController {

  static index(req, res, next) {
    const url = `https://api.yummly.com/v1/api/recipes?_app_id=${process.env.APP_ID}&_app_key=${process.env.APP_KEY}`
    let searchParam
    food = Food.find(req.params.id)
    .then(food => {
      return searchParam = `&q=${food.name}`
    })
    .then(searchParam => {
      let fullUrl = `${url}${searchParam}`
      return axios.get(`${fullUrl}`)
    })
    .then(response => {
      eval(pry.it)
      console.log(response)
      // response.data.matches recipeName
      // response.data.matches id
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

module.exports = recipesController;
