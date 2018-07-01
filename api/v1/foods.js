const express = require('express');

const foodRouter = express.Router();

foodRouter.get('/', (req, res) => {
  res.json({
    message: 'working'
  })
});



module.exports = foodRouter;
