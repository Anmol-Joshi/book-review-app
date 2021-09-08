const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
const Item = require('../models/item.js');
const auth = require('../middlewares/auth');
// const UserCredential = require('../models/user-credential');
const User = require('../models/user');
const Review = require('../models/review');
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
router.post('/:itemId/reviews/', auth.authenticate, (req, res) => {
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
      (err, doc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          let newRatingSum = 0;
          let newTotalRatings = 0;
          Review.find({ itemId: req.params.itemId })
            .then((reviews) => {
              newRatingSum = 0;
              newTotalRatings = 0;
              reviews.forEach((review) => {
                newRatingSum += review.rating;
                newTotalRatings++;
              });
              console.log('*****newRatingSum', newRatingSum);
              console.log('****newTotalRatings', newTotalRatings);
              console.log(
                '****itemId is',
                'ObjectId("',
                req.params.itemId,
                '")'
              );
              let ObjectId = require('mongodb').ObjectId;
              // let o_id = new ObjectId(req.params.itemId);
              // const itmId = req.params.itemId; //new ObjectId(req.params.itemId);
              console.log('****itmId is', req.params.itemId);
              let newRatingSumGlobal;
              let newTotalRatingsGlobal;
              Item.findById({ _id: new ObjectId(req.params.itemId) }).then(
                (item) => {
                  // Item.findOneAndReplace;
                  console.log('*****newRatingSum1', newRatingSum);
                  console.log('****newTotalRatings1', newTotalRatings);
                  console.log(item);
                  // item.ratingSum = newRatingSum;
                  // item.totalRatings = newTotalRatings;

                  // console.log('****ratingSum is', item.ratingSum);
                  // console.log('item after update is', item);
                  // console.log('item type is', typeof item);
                  // console.log('title');
                  // let keys = Object.keys(item);
                  // console.log('**object length', keys.length);
                  // keys.map((k) => {
                  //   console.log('***key', k, '**value', item[k]);
                  // });
                  newRatingSumGlobal = newRatingSum;
                  newTotalRatingsGlobal = newTotalRatings;
                  console.log(item['_doc']['ratingSum']);
                  item['_doc']['ratingSum'] = newRatingSum;
                  item['_doc']['totalRatings'] = newTotalRatings;
                  console.log('****item_doc is', item['_doc']);
                  item.save().then(() => {
                    console.log(item);
                    console.log('updated');
                  });
                },
                (err) => {
                  console.log(`Error in finding item ${err}`);
                }
              );
            })
            .catch((err) => console.log(err));
          // console.log('******inside success query');
          res.status(200).send(reviewQuery);
        }
      }
    );
  });
  //Update the average review and rating
  console.log('****newRatingSumGlobal is', newRatingSumGlobal);
  console.log('****newTotalRatingsGlobal is', newTotalRatingsGlobal);
});
// module.exports = router;
// _id
// :
// 6138435062bdd96c58d41168
// amazon
// :
// "https://www.amazon.in/dp/B00KHX0II4/ref=dp-kindle-redirect?_encoding=U..."
// author
// :
// "Peter Thiel, Blake Masters"
// category
// :
// "books"
// description
// :
// WHAT VALUABLE COMPANY IS NOBODY BUILDING?

// "The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won’t make a search engine. If you are copying these guys, you aren’t learning from them. It’s easier to copy a model than to make something new: doing what we already know how to do takes the world from 1 to n, adding more of something familiar. Every new creation goes from 0 to 1. This book is about how to get there.

// ‘Peter Thiel has built multiple breakthrough companies, and Zero to One shows how.’
// ELON MUSK, CEO of SpaceX and Tesla

// ‘This book delivers completely new and refreshing ideas on how to create value in the world.’
// MARK ZUCKERBERG, CEO of Facebook

// ‘When a risk taker writes a book, read it. In the case of Peter Thiel, read it twice. Or, to be safe, three times. This is a classic.’
// NASSIM NICHOLAS TALEB, author of The Black Swan"
// image
// :
// "https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg"
// libgen
// :
// "http://libgen.li/ads.php?md5=81e169c36fc303fa1f36221d3e68a4d0"
// pages
// :
// "225"
// ratingSum
// :
// "0"
// title
// :
// "Zero to One: Notes on Startups,How to Build the Future"
// totalRatings
// :
// "0"
