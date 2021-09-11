const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const auth = require('../middlewares/auth');
const Cart = require('../models/cart.js');
const Order = require('../models/order.js');

const router = express.Router();
const rzpKey = 'rzp_test_n4HBEt2BU1tZAC'; // process.env.RZP_KEY_ID;
const secret = 'ccuaz3E8AppKKdi3H0lfjh6h'; //process.env.RZP_KEY_SECRET;
const currency = 'INR';

const rzpInstance = new Razorpay({
  key_id: rzpKey,
  key_secret: secret,
});

router.post('/', auth.authenticate, (req, res) => {
  Cart.findOne({ session_id: req.session.id }).then(
    (cart) => {
      const { cartItems, price } = cart;
      const totalAmount = price.totalAmount * 100;
      const order = new Order({
        user_id: req.session.userid,
        totalAmount,
        currency,
        status: 'CREATED',
        cartItems,
      });
      order.save().then(
        () => {
          const orderId = order.id;
          const options = {
            totalAmount,
            currency,
            //receipt denotes our order id on Razorpay
            receipt: orderId,
          };

          //Create order on razorpay
          rzpInstance.orders.create(options, (err, rzpOrder) => {
            if (err) {
              res
                .status(500)
                .send({ error: 'Error in creating razorpay order' });
              return;
            }

            res.status(201).send({
              totalAmount,
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

router.put('/orders/:id', auth.authenticate, (req, res) => {
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
    .update(orderId + '|' + razorpay_payment_id)
    .digest('hex');
  if (generated_signature === razorpay_signature) {
    Order.updateOne(
      { id: orderId },
      {
        $set: {
          status: 'COMPLETED',
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
      }
    ).then(() => {
      res.send(204).send();
    });
  } else {
    res.status(400).send({ error: 'Signature validation failed' });
    return;
  }
});

module.exports = router;
