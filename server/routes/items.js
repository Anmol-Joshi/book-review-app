const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
const Item = require('../models/item.js');
const auth = require('../middlewares/auth');
// const UserCredential = require('../models/user-credential');
const User = require('../models/user');
const Review = require('../models/review');
const review = require('../models/review');

// Item api
// GET all items
router.get('/', (req, res) => {
  Item.find({})
    .then((item) => {
      if (item) {
        res.status(200).send(item);
      } else {
        res.status(200).send({ result: 'No item found' });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// GET item with itemId
router.get('/:itemId', (req, res) => {
  Item.findOne({ _id: req.params.itemId })
    .then((item) => {
      console.log(typeof item);
      if (item.length === 0) {
        res
          .status(404)
          .send({ result: 'Item with requested itemId was not found' });
      } else {
        res.status(200).send(item);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// router.get('/:category', (req, res) => {
//   Item.find({ category: req.params.category }).then((item) => {
//     res.status(200).send(item);
//   });
// });

// Review for item
router.get('/:itemId/reviews', (req, res) => {
  // if (!req.session.userId) {
  //   res.status(400).send({ error: 'Not logged in' });
  // }
  Review.find({ itemId: req.params.itemId }).then((reviews) => {
    res.status(200).send(reviews);
  });
});
router.delete('/:itemId/reviews', auth.authenticate, (req, res) => {
  if (!req.session.userId) {
    res.status(400).send({ error: 'Not logged in' });
  }
  Review.deleteOne({
    $and: [{ userId: req.session.userId }, { itemId: req.params.itemId }],
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).send("Couldn't delete review");
    });
});
router.post('/:itemId/reviews', auth.authenticate, (req, res) => {
  if (!req.session.userId) {
    res.status(400).send({ error: 'Not logged in' });
  }
  if (!req.body.rating) {
    res.status(400).send({ error: 'Rating not present in request' });
    return;
  }
  if (req.body.rating < 1 || req.body.rating > 5) {
    res.status(400).send({ error: 'Rating must be between 1 and 5' });
    return;
  }
  // Item.findOne({ _id: req.params.itemId }).then((item) => {
  //   item.ratingSum = item.ratingSum + req.body.rating;
  //   item.totalRatings = item.totalRatings + 1;
  // });
  User.findOne({ _id: req.session.userId }).then((item) => {
    console.log(req.session.userId);
    // console.log(req.session.userId);
    const reviewQuery = new Review({});
    reviewQuery.userId = req.session.userId;
    reviewQuery.itemId = req.params.itemId;
    // console.log(req.params.itemId);
    item.firstName !== undefined && (reviewQuery.firstName = item.firstName);
    item.lastName !== undefined && (reviewQuery.lastName = item.lastName);
    req.body.rating !== undefined && (reviewQuery.rating = req.body.rating);
    req.body.review !== undefined && (reviewQuery.review = req.body.review);
    Review.findOneAndUpdate(
      {
        $and: [{ userId: req.session.userId }, { itemId: req.params.itemId }],
      },
      reviewQuery,
      {
        upsert: true,
        runValidators: true,
      },
      // { runValidators: true },
      (err, doc) => {
        if (err) {
          res.status(500).send(err);
          // { error: 'Internal Server Error' }
        } else {
          res.status(200).send(reviewQuery);
        }
      }
    );
  });
});
module.exports = router;
