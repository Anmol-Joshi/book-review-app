const express = require('express');
const router = express.Router();
const Item = require('../models/item.js');
const auth = require('../middlewares/auth');
const User = require('../models/user');
const Review = require('../models/review');
const { connection } = require('mongoose');

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
  Item.findOne({ _id: new Object(req.params.itemId) })
    .then((item) => {
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

// Review for item
router.get('/:itemId/reviews', (req, res) => {
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
let newRatingSumGlobal;
let newTotalRatingsGlobal;
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
  const insertReview = new Review({
    itemId: req.params.itemId,
    userId: req.session.userId,
    rating: req.body.rating,
    review: req.body.review,
  });
  User.find({ _id: req.session.userId }).then((user) => {
    const firstNameS = user[0].firstName;
    const lastNameS = user[0].lastName;
    const insertReview = new Review({
      itemId: req.params.itemId,
      userId: req.session.userId,
      rating: req.body.rating,
      review: req.body.review,
      firstName: firstNameS,
      lastName: lastNameS,
    });
    Review.findOne({
      $and: [{ userId: req.session.userId }, { itemId: req.params.itemId }],
    }).then(
      (review) => {
        if (review == null) {
          insertReview.save(() => {
            updateAvgReview();
          });
        } else {
          review.review = insertReview.review;
          review.rating = insertReview.rating;
          review.save(() => {
            updateAvgReview();
          });
        }
      },
      (err) => {}
    );
  });

  function updateAvgReview() {
    Review.find({ itemId: req.params.itemId }).then((reviews) => {
      let newRatingSum = 0;
      let newTotalRatings = 0;
      reviews.forEach((review) => {
        newRatingSum += review.rating;
        newTotalRatings++;
      });

      let ObjectId = require('mongodb').ObjectId;
      Item.findById({ _id: new ObjectId(req.params.itemId) }).then(
        (item) => {
          item.ratingSum = newRatingSum;
          item.totalRatings = newTotalRatings;
          item.save();
        },
        (err) => {}
      );
    });
  }
  res.status(200).send('Update/Insert successful');
});
module.exports = router;
