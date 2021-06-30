const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Item = require('../models/item.js');

router.get('/:category', (req, res) => {
  Item.find({}, function (err, data) {
    console.log(err, data, data.length());
  });
});

module.exports = router;
