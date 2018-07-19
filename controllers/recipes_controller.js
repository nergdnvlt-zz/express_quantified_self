const Food = require('../models/food')
const Recipe = require('../models/recipe')

class recipesController {

  static index(req, res, next) {
    const url = 'https://api.yummly.com/v1/recipes?'
    Food.find(req.params.id)
    .then(foods => {
      // Do something with the food and api
    });
  }
}

module.exports = recipesController;
