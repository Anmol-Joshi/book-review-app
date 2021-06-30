const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
const Item = require('../models/item.js');
router.get('/', (req, res) => {
  Item.find({}).then((item) => {
    res.status(200).send(item);
  });
});
router.get('/:category', (req, res) => {
  Item.find({ category: req.params.category }).then((item) => {
    res.status(200).send(item);
  });
});

module.exports = router;
