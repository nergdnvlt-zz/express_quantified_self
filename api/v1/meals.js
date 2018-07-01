const express = require('express');

const mealRouter = express.Router();

mealRouter.get('/', (req, res) => {
  res.json({
    message: 'working'
  })
});



module.exports = mealRouter;
