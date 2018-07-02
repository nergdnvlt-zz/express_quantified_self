const mealfoods = require('../../../mealfoods')

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE mealfoods RESTART IDENTITY CASCADE')
  .then(function () {
    return knex('mealfoods').insert(mealfoods);
  });
};
