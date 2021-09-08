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
    // insertReview.save().then(
    //   (savedDoc) => {
    //     console.log(`Saved with id: ${savedDoc.id}`);
    //   },
    //   (err) => {
    //     console.log(`Error in saving blog ${err}`);
    //   }
    // );
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
          review.save();
        }
      },
      (err) => {
        console.log(err);
      }
    );
    // ,
    // {
    //   itemId: insertReview.itemId,
    //   userId: insertReview.userId,
    //   rating: insertReview.rating,
    //   review: insertReview.review,
    //   firstName: insertReview.firstName,
    //   lastName: insertReview.lastName,
    // },
    // { upsert: true }
    // );
    // Review.save(
    //   { userId: req.session.userId, itemId: req.params.itemId },
    //   insertReview,
    //   { upsert: true }
    // )
    //   .then((success) => console.log(success))
    //   .then((err) => console.log(err));
  });
  // insertReview.save().then(
  //   (savedDoc) => {
  //     console.log(`Saved with id: ${savedDoc.id}`);
  //   },
  //   (err) => {
  //     console.log(`Error in saving blog ${err}`);
  //   }
  // );

  // Review.create({
  //   itemId: req.params.itemId,
  //   userId: req.session.userId,
  //   first
  // });
});
// router.post('/:itemId/reviews/', auth.authenticate, (req, res) => {
//   if (!req.session.userId) {
//     res.status(400).send({ error: 'Not logged in' });
//   }
//   if (!req.body.rating) {
//     res.status(400).send({ error: 'Rating not present in request' });
//     return;
//   }
//   if (req.body.rating < 1 || req.body.rating > 5) {
//     res.status(400).send({ error: 'Rating must be between 1 and 5' });
//     return;
//   }
//   // Item.findOne({ _id: req.params.itemId }).then((item) => {
//   //   item.ratingSum = item.ratingSum + req.body.rating;
//   //   item.totalRatings = item.totalRatings + 1;
//   // });
//   User.findOne({ _id: req.session.userId }).then((item) => {
//     console.log(req.session.userId);
//     // console.log(req.session.userId);
//     const reviewQuery = new Review({});
//     reviewQuery.userId = req.session.userId;
//     reviewQuery.itemId = req.params.itemId;
//     // console.log(req.params.itemId);
//     item.firstName !== undefined && (reviewQuery.firstName = item.firstName);
//     item.lastName !== undefined && (reviewQuery.lastName = item.lastName);
//     req.body.rating !== undefined && (reviewQuery.rating = req.body.rating);
//     req.body.review !== undefined && (reviewQuery.review = req.body.review);
//     Review.findOneAndUpdate(
//       {
//         $and: [{ userId: req.session.userId }, { itemId: req.params.itemId }],
//       },
//       reviewQuery,
//       {
//         upsert: true,
//         runValidators: true,
//       },
//       (err, doc) => {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           let newRatingSum = 0;
//           let newTotalRatings = 0;
//           Review.find({ itemId: req.params.itemId })
//             .then((reviews) => {
//               newRatingSum = 0;
//               newTotalRatings = 0;
//               reviews.forEach((review) => {
//                 newRatingSum += review.rating;
//                 newTotalRatings++;
//               });
//               newRatingSumGlobal = newRatingSum;
//               newTotalRatingsGlobal = newTotalRatings;
//               // console.log('**********ratingSum', newRatingSum);
//               // console.log('**********totalRatings', newTotalRatings);
//               // console.log(
//               //   '***********itemId is',
//               //   'ObjectId(' + req.params.itemId + ')'
//               // );
//               const query = { _id: req.params.itemId };
//               const update = {
//                 $set: {
//                   ratingSum: newRatingSum,
//                   totalRatings: newTotalRatings,
//                 },
//               };
//               const options = { returnNewDocument: true };
//               // Item.find({ _id: req.params.itemId }).then((item) => {
//               //   console.log(newRatingSum);
//               //   console.log(newTotalRatings);
//               //   item[0].ratingSum = newRatingSum;
//               //   item[0].totalRatings = newTotalRatings;
//               //   console.log('****first', item);
//               // });
//               // Item.find({ _id: req.params.itemId }).then((item) => {
//               //   // item[0].ratingSum = newRatingSum;
//               //   // item[0].totalRatings = newTotalRatings;
//               //   console.log('***second', item);
//               // });
//               // Item.findOneAndUpdate(query, update, options)
//               //   .then((updatedDocument) => {
//               //     if (updatedDocument) {
//               //       console.log(
//               //         `Successfully updated document: ${updatedDocument}.`
//               //       );
//               //     } else {
//               //       console.log('No document matches the provided query.');
//               //     }
//               //     return updatedDocument;
//               //   })
//               //   .catch((err) =>
//               //     console.error(`Failed to find and update document: ${err}`)
//               //   );
//               // Item.findOne({ _id: req.params.itemId }).then(
//               //   (item) => {
//               //     // console.log('****line 131 item is', item.keys);
//               //     let keys = Object.keys(item);
//               //     console.log('**object length', keys.length);
//               //     console.log('8888Line 134', item['_doc']['ratingSum']);
//               //     // keys.map((k) => {
//               //     //   if (k == '_doc') {
//               //     //     console.log('***key', k, '**value', item[k]);
//               //     //     item[k].ratingSum = newRatingSum;
//               //     //     item[k].totalRatings = newTotalRatings;
//               //     //     console.log(item[k]);
//               //     //     item.save().then(() => {
//               //     //       console.log('updated');
//               //     //     });
//               //     //   }
//               //     // });
//               //     keys.map((k) => {
//               //       if (k == '_doc') {
//               //         console.log('second***key', k, '**value', item[k]);
//               //         // item[k].ratingSum = newRatingSum;
//               //         // item[k].totalRatings = newTotalRatings;
//               //         // console.log(item[k]);
//               //         // item.save().then(() => {
//               //         //   console.log('updated');
//               //         // });
//               //       }
//               //     });
//               //     item.ratingSum = newRatingSum;
//               //     item.totalRatings = newTotalRatings;
//               //     // item.save().then(() => {
//               //     //   console.log('updated');
//               //     // });
//               //   },
//               //   (err) => {
//               //     console.log(`Error in finding item ${err}`);
//               //   }
//               // );
//             })
//             .catch((err) => console.log(err));
//           // console.log('******inside success query');
//           res.status(200).send(reviewQuery);
//         }
//       }
//     );
//   });
//   Item.find(
//     { _id: new Object(req.params.itemId) },
//     {
//       $inc: {
//         ratingSum: 1,
//       },
//     }
//   );
//   Item.findById({ _id: req.params.itemId }).then(
//     (item) => {
//       console.log(req.params.itemId);
//       console.log('line 219 item is', item);
//       console.log(item.ratingSum);
//       console.log(item.totalRatings);
//       item.ratingSum = 1;
//       item.totalRatings = 1;
//       console.log(item.ratingSum);
//       console.log(item);
//       // item.ratingSum = item.ratingSum + 1;
//       // console.log('*** line 221 ratingSum is', item.ratingSum);
//       // blog.author = "Sagar Jain";
//       // blog.visitors++;
//       // blog.save().then(() => {console.log("Updated");});
//     },
//     (err) => {
//       console.log(`Error in finding blog ${err}`);
//     }
//   );
//   // }).then((item) => {
//   //   console.log('***line 210', item.keys);
//   //   let keys = Object.keys(item[0]);
//   //   console.log('****length of keys is', keys.length);
//   //   keys.map((k) => {
//   //     console.log('***8k is', k);
//   //     if (k === '_doc') {
//   //       {
//   //         $set: {
//   //           ratingSum: newRatingSum,
//   //           totalRatings: newTotalRatings,
//   //         }
//   //       }
//   //       item[0][k].ratingSum = 1;
//   //       item[0][k].totalRatings = 1;
//   //       item[0][k].save();
//   //       console.log('second***key', k, '**value', item[0][k].ratingSum);
//   //       console.log('second***key', k, '**value', item[0][k].totalRatings);
//   //       // item.save()
//   //       //   item[k].ratingSum = newRatingSumGlobal;
//   //       //   item[k].totalRatings = newTotalRatingsGlobal;
//   //       //   console.log(item[k]);
//   //       //   item.save().then(() => {
//   //       //     console.log('updated');
//   //       //   });
//   //     }
//   //   });
//   // console.log(newRatingSumGlobal);
//   // console.log(newTotalRatingsGlobal);
//   // console.log('item is', item);
//   // console.log(item[0].ratingSum);
//   // console.log(item[0].totalRatings);
//   // item[0].ratingSum = 2;
//   // item[0].totalRatings = 2;
//   // console.log('****first', item);
//   // });
//   // Item.find({ _id: req.params.itemId }).then((item) => {
//   //   // item[0].ratingSum = newRatingSum;
//   //   // item[0].totalRatings = newTotalRatings;
//   //   console.log('***second', item);
//   // });
// });
// console.log('****newRatingSumGlobal', newRatingSumGlobal);
// console.log('*****newTotalRatingsGlobal', newTotalRatingsGlobal);

module.exports = router;
// _id
// :
// 6138435062bdd96c58d41168
// amazon
// :
// "https://www.amazon.in/dp/B00KHX0II4/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1"
// author
// :
// "Peter Thiel, Blake Masters"
// category
// :
// "books"
// description
// :
// "WHAT VALUABLE COMPANY IS NOBODY BUILDING?

// The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won’t make a search engine. If you are copying these guys, you aren’t learning from them. It’s easier to copy a model than to make something new: doing what we already know how to do takes the world from 1 to n, adding more of something familiar. Every new creation goes from 0 to 1. This book is about how to get there.

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
