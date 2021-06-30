const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
const Item = require('../models/item.js');

router.get('/:category', (req, res) => {
  console.log('working', Item);
  // res.send('Hello');
  // Item.find({}, function (err, data) {
  //   console.log(err, data, data.length());
  // });
  console.log('*****', req.params.category);
  Item.find({ category: req.params.category }).then((item) => {
    res.send(item);
  });
});

module.exports = router;
