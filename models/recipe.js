const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const Food = require('../models/food')

class Recipe {
}

module.exports = Recipe
