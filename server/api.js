const express = require('express');
const router = express.Router();

const cors = require('cors');
const app = express();

const users = require('./routes/users');
const sessions = require('./routes/sessions');
const items = require('./routes/items');
const cart = require('./routes/cart');
const orders = require('./routes/orders');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(
  cors({
    credentials: true,
    origin: ['https://best-read.herokuapp.com/', 'http://localhost:3000'],
  })
);

router.use('/users', users);

router.use('/sessions', sessions);

router.use('/items', items);

router.use('/cart', cart);

router.use('/orders', orders);

module.exports = router;
