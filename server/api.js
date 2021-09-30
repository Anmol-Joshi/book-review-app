const express = require('express');
const router = express.Router();

const cors = require('cors');
const app = express();

const users = require('./routes/users');
const sessions = require('./routes/sessions');
const items = require('./routes/items');
const cart = require('./routes/cart');
const orders = require('./routes/orders');
// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.use(cors());
router.use(
  cors({
    credentials: true,
    // origin: 'http://localhost:3000',
    origin: 'https://best-read.herokuapp.com/',
  })
);
// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); //http://localhost:4000/api/cart/
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
router.use('/users', users);

router.use('/sessions', sessions);

router.use('/items', items);

router.use('/cart', cart);

router.use('/orders', orders);

module.exports = router;
