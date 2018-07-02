const Meal = require('../models/meal')

class mealsController {

  static index(req, res, next) {
    Meal.all()
    .then(meals => {
      return res.json(meals);
    });
  }

  static show(req, res, next) {
    Meal.find(req.params.id)
    .then(meal => {
      if(!meal) {
        return res.sendStatus(404);
      } else {
        return res.json(meal);
      }
    });
  }
}

module.exports = mealsController
