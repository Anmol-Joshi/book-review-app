const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
const auth = require('../middlewares/auth');
const Cart = require('../models/cart.js');
const Order = require('../models/order.js');
require('dotenv').config();

const router = express.Router();
const rzpKey = process.env.RZP_KEY_ID;
const secret = process.env.RZP_KEY_SECRET;
const currency = 'INR';

const rzpInstance = new Razorpay({
  key_id: rzpKey,
  key_secret: secret,
});
router.get('/', auth.authenticate, (req, res) => {
  if (!req.session.userId) {
    res.status(400).send({ error: 'Not logged in' });
  }
  Order.find({ userId: req.session.userId, status: 'COMPLETED' })
    .then((order) => {
      console.log(order);
      res.status(200).send(order);
    })
    .catch((err) => {
      console.log(err);
    });
});

// When pay now button is pressed ,
// POST api/orders is called which in turn
// creates an order in the db by finding the
// order data from the cart
router.post('/', auth.authenticate, (req, res) => {
  if (!req.session.userId) {
    res.status(400).send({ error: 'Not logged in' });
  }
  Cart.findOne({ sessionId: req.session.id }).then(
    (cart) => {
      const { cartItems, totalAmount } = cart;
      const amount = totalAmount;
      const order = new Order({
        userId: req.session.userId,
        amount,
        currency,
        status: 'CREATED',
        cartItems,
      });
      order.save().then(
        () => {
          const orderId = order.id;
          const options = {
            amount,
            currency,
            //receipt denotes our order id on Razorpay
            receipt: orderId,
          };
          console.log('**line 48', amount);
          //Create order on razorpay
          rzpInstance.orders.create(options, (err, rzpOrder) => {
            if (err) {
              res
                .status(500)
                .send({ error: 'Error in creating razorpay order' });
              return;
            }

            res.status(201).send({
              amount,
              currency,
              orderId,
              //This is required by client to co-ordinate with razorpay
              rzpOrderId: rzpOrder.id,
            });
          });
        },
        () => {
          res.status(500).send({ error: 'Error in creating order' });
        }
      );
    },
    () => {
      res.status(500).send({ error: 'Error in getting cart' });
    }
  );
});

// After payment is complete, the put api is called and
// status of order is update to "COMPLETED" and cart is emptied
router.put('/:id', auth.authenticate, (req, res) => {
  const orderId = req.params.id;
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  if (!razorpay_payment_id || !razorpay_signature) {
    res
      .status(400)
      .error({ error: 'Missing razorpay payment id or signature' });
    return;
  }
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  if (generated_signature === razorpay_signature) {
    Order.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: 'COMPLETED',
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
      }
    ).then(() => {
      Cart.findOne({ sessionId: req.session.id }).then(
        (cart) => {
          cart.cartItems = [];
          cart.totalAmount = 0;
          cart.save().then(() => {});
        },
        (err) => {
          console.log(`Error in finding cart ${err}`);
        }
      );
      res.status(204).send({ message: 'Order updated' });
    });
  } else {
    res.status(400).send({ error: 'Signature validation failed' });
    return;
  }
});

module.exports = router;
