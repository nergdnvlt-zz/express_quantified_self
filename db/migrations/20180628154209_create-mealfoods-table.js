
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE mealfoods(
    id SERIAL PRIMARY KEY NOT NULL,
    meal_id integer REFERENCES meals (id) ON DELETE CASCADE,
    food_id integer REFERENCES foods (id) ON DELETE CASCADE
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE mealfoods`
  return knex.raw(dropQuery)
};
