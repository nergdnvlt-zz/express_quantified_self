const foods = require('../../data/foods')

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE foods RESTART IDENTITY CASCADE')
  .then(function () {
    return knex('foods').insert(foods);
  });
};
