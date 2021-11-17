const express = require('express');
const session = require('express-session');
const router = express.Router();
const Cart = require('../models/cart.js');

//Get Cart
router.get('/', (req, res) => {
  const sessionId = req.session.id;
  Cart.findOne({ sessionId: sessionId })
    .then((cart) => {
      if (cart) {
        if (cart.cartItems.length === 0) {
          console.log('cart is empty');
          res.status(200).send({ result: 'Cart is Empty' });
        } else {
          console.log('cart is', cart);
          res.status(200).send(cart);
        }
      } else {
        console.log('no cart');
        res.status(201).send({ result: 'No cart' });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Add item to cart
router.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: 'Empty body sent in request' });
    return;
  }
  const cartItem = req.body;
  const sessionId = req.session.id;
  console.log('session id in post is', sessionId);
  if (!sessionId) {
    res.status(400).send({ error: 'sessionId not present in request' });
    return;
  }

  if (!cartItem) {
    res.status(400).send({ error: 'CartItems not present in request' });
    return;
  }

  let cartElementExists = false;
  let oldQty;
  let newQty;
  let totalAmount;
  let oldPrice;

  Cart.findOne({ sessionId })
    .then((cart) => {
      //if cart already exists
      if (cart) {
        for (let i = 0; i < cart.cartItems.length; i++) {
          if (cart.cartItems[i].itemId === cartItem.itemId) {
            cartElementExists = true;
            oldPrice = cart.cartItems[i].quantity * cart.cartItems[i].price;
            // cart.cartItems[i].qty = cart.cartItems[i].qty + 1;
            oldQty = cart.cartItems[i].quantity;
            cart.cartItems[i].quantity = cartItem.quantity;
            newQty = cart.cartItems[i].quantity;
            cart.totalAmount =
              cart.totalAmount + (newQty - oldQty) * cart.cartItems[i].price;
            totalAmount = cart.totalAmount;
            cart
              .save()
              .then(() => {
                console.log('Cart saved');
                res.status(200).send('Cart updated');
              })
              .catch((err) => {
                res.status(500).send({ err: err });
              });
          }
        }
        if (!cartElementExists) {
          console.log(cartItem);
          console.log('Cart items quantity');
          cart.cartItems.push({
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            title: cartItem.title,
            author: cartItem.author,
            description: cartItem.description,
            pages: cartItem.pages,
            // publishDate: cartItem.publishDate,
            image: cartItem.image,
            category: cartItem.category,
            ratingSum: cartItem.ratingSum,
            totalRatings: cartItem.totalRatings,
            price: cartItem.price,
          });
          cart.totalAmount =
            cart.totalAmount + cartItem.quantity * cartItem.price;
          console.log(cart);
          cart
            .save()
            .then(() => {
              res
                .status(204)
                .send({ message: 'Item added to cart successfully' });
            })
            .catch((e) => {
              res.status(500).send({ err: 'Error while adding item to cart' });
            });
        }
      } else {
        console.log("Cart doesn't exist");
        console.log(cartItem);
        const cartEntity = new Cart({
          sessionId: sessionId,
          cartItems: cartItem,
          totalAmount: cartItem.quantity * cartItem.price,
        });

        cartEntity.save().then(() => {
          res.status(201).send({ id: sessionId });
        });
      }
    })
    .catch((e) => {
      res.status(500).send({ error: e });
    });
});
// Delete item from Cart
router.delete('/', (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: 'Empty body sent in request' });
    return;
  }
  const sessionId = req.session.id;
  const itemId = req.body.itemId;
  if (!sessionId) {
    res.status(400).send({ error: 'sessionId not present in request' });
    return;
  }

  if (!itemId) {
    res.status(400).send({ error: 'productId not present in request' });
    return;
  }

  Cart.findOne({ sessionId })
    .then((cart) => {
      if (cart) {
        for (let i = 0; i < cart.cartItems.length; i++) {
          console.log(cart.cartItems[i]);
          if (cart.cartItems[i].itemId === itemId) {
            console.log('itemId is', itemId);
            console.log('cart item', i, '***', cart.cartItems[i]);
            cart.totalAmount =
              cart.totalAmount -
              cart.cartItems[i].quantity * cart.cartItems[i].price;
            cart.cartItems[i].remove();
          }
        }
        console.log('Cart Item deleted');
        cart
          .save()
          .then(() => {
            res.status(201).send({ result: 'Item deleted from cart' });
          })
          .catch(() => {
            res.status(500).send({ error: 'Error while adding item to cart' });
          });

        return;
      } else {
        res.send({ error: 'Invalid Session Id passed' });
      }
    })
    .catch(() => {
      res.status(500).send({ error: 'Internal Server Error' });
    });
  return;
});
module.exports = router;
