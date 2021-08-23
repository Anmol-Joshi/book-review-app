const express = require('express');
const router = express.Router();

const cors = require('cors');
const app = express();

const users = require('./routes/users');
const sessions = require('./routes/sessions');
const items = require('./routes/items');
// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(cors());

// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
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

module.exports = router;
