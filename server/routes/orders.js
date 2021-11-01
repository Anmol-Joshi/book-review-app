const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
const auth = require('../middlewares/auth');
const Cart = require('../models/cart.js');
const Order = require('../models/order.js');

const router = express.Router();
const rzpKey = 'rzp_test_n4HBEt2BU1tZAC'; // process.env.RZP_KEY_ID;
const secret = 'ccuaz3E8AppKKdi3H0lfjh6h'; //process.env.RZP_KEY_SECRET;
const currency = 'INR';
// REACT_APP_RZP_KEY_ID=rzp_test_n4HBEt2BU1tZAC
// RZP_KEY_ID=rzp_test_n4HBEt2BU1tZAC
// RZP_KEY_SECRET=ccuaz3E8AppKKdi3H0lfjh6h
const rzpInstance = new Razorpay({
  key_id: rzpKey,
  key_secret: secret,
});
router.get('/', auth.authenticate, (req, res) => {
  if (!req.session.userId) {
    res.status(400).send({ error: 'Not logged in' });
  }
  Order.find({ userId: req.session.userId })
    .then((order) => {
      console.log(order)
      res.status(200).send(order);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post('/', auth.authenticate, (req, res) => {
  console.log('***line 20 orders');
  if (!req.session.userId) {
    res.status(400).send({ error: 'Not logged in' });
  }
  Cart.findOne({ sessionId: req.session.id }).then(
    (cart) => {
      // console.log('*** line 26 cart is', cart.totalAmount);
      const { cartItems, totalAmount } = cart;
      console.log('*** line 26 totalAmount is', totalAmount);
      const amount = totalAmount;
      const order = new Order({
        userId: req.session.userId,
        amount,
        currency,
        status: 'CREATED',
        cartItems,
      });
      // console.log('***line 37 order is', order);
      order.save().then(
        () => {
          console.log('line 40 order saved');
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

router.put('/:id', auth.authenticate, (req, res) => {
  // console.log('***orders line 79 req', req);
  console.log('***orders line 80 req.body', req.body);
  // console.log('***orders line 79 req',req)
  const orderId = req.params.id;
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  console.log('**line 85');
  if (!razorpay_payment_id || !razorpay_signature) {
    res
      .status(400)
      .error({ error: 'Missing razorpay payment id or signature' });
    return;
  }
  console.log('**line 92');
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  console.log('**line 97');
  console.log(generated_signature);
  console.log(razorpay_signature);
  if (generated_signature === razorpay_signature) {
    console.log('**line 98');
    Order.updateOne(
      { _id: ObjectId(orderId) },
      {
        $set: {
          status: 'COMPLETED',
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
      }
    ).then(() => {
      // console.log('**line 111');
      Cart.findOne({ sessionId: req.session.id }).then(
        (cart) => {
          console.log(cart);
          cart.cartItems = [];
          cart.totalAmount = 0;
          console.log('cart', cart);
          cart.save().then(() => {
            console.log('Cart emptied');
          });
        },
        (err) => {
          console.log(`Error in finding cart ${err}`);
        }
      );
      res.status(204).send({ message: 'Order updated' });
    });
  } else {
    console.log('**line 114');
    res.status(400).send({ error: 'Signature validation failed' });
    return;
  }
});

module.exports = router;
