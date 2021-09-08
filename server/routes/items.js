const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
const Item = require('../models/item.js');
const auth = require('../middlewares/auth');
// const UserCredential = require('../models/user-credential');
const User = require('../models/user');
const Review = require('../models/review');
const { connection } = require('mongoose');
// const review = require('../models/review');

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
      console.log(typeof item);
      console.log(item);
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
    // console.log('***user is', user[0].firstName);
    const firstNameS = user[0].firstName;
    // console.log('insertReview', insertReview);
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
          insertReview.save();
        } else {
          console.log('***review is', review);
          review.review = insertReview.review;
          review.rating = insertReview.rating;
          review.save().then(updateAvgReview());
        }
        // updateAvgReview();
      },
      (err) => {
        console.log(err);
      }
    );
  });
  // Test
  function updateAvgReview() {
    Review.find({ itemId: req.params.itemId }).then((reviews) => {
      let newRatingSum = 0;
      let newTotalRatings = 0;
      reviews.forEach((review) => {
        newRatingSum += review.rating;
        newTotalRatings++;
      });
      console.log('*****newRatingSum', newRatingSum);
      console.log('****newTotalRatings', newTotalRatings);
      console.log('****itemId is', 'ObjectId("', req.params.itemId, '")');
      let ObjectId = require('mongodb').ObjectId;
      // let o_id = new ObjectId(req.params.itemId);
      // const itmId = req.params.itemId; //new ObjectId(req.params.itemId);
      console.log('****itmId is', req.params.itemId);
      // let newRatingSumGlobal;
      // let newTotalRatingsGlobal;
      Item.findById({ _id: new ObjectId(req.params.itemId) }).then(
        (item) => {
          // Item.findOneAndReplace;
          console.log('*****newRatingSum1', newRatingSum);
          console.log('****newTotalRatings1', newTotalRatings);
          // console.log(item);
          item.ratingSum = newRatingSum;
          item.totalRatings = newTotalRatings;
          console.log(item);
          item.save();
        },
        (err) => {
          console.log(`Error in finding item ${err}`);
        }
      );
    });
  }
  // Review.find({ itemId: req.params.itemId }).then((reviews) => {
  //   let newRatingSum = 0;
  //   let newTotalRatings = 0;
  //   reviews.forEach((review) => {
  //     newRatingSum += review.rating;
  //     newTotalRatings++;
  //   });
  //   console.log('*****newRatingSum', newRatingSum);
  //   console.log('****newTotalRatings', newTotalRatings);
  //   console.log('****itemId is', 'ObjectId("', req.params.itemId, '")');
  //   let ObjectId = require('mongodb').ObjectId;
  //   // let o_id = new ObjectId(req.params.itemId);
  //   // const itmId = req.params.itemId; //new ObjectId(req.params.itemId);
  //   console.log('****itmId is', req.params.itemId);
  //   // let newRatingSumGlobal;
  //   // let newTotalRatingsGlobal;
  //   Item.findById({ _id: new ObjectId(req.params.itemId) }).then(
  //     (item) => {
  //       // Item.findOneAndReplace;
  //       console.log('*****newRatingSum1', newRatingSum);
  //       console.log('****newTotalRatings1', newTotalRatings);
  //       // console.log(item);
  //       item.ratingSum = newRatingSum;
  //       item.totalRatings = newTotalRatings;
  //       console.log(item);
  //       item.save();
  //     },
  //     (err) => {
  //       console.log(`Error in finding item ${err}`);
  //     }
  //   );
  // });

  res.status(200).send('Update/Insert successful');
});
module.exports = router;
