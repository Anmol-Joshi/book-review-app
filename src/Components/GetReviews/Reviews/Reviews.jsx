import React from 'react';
import './Reviews.css';

function Review(props) {
  let { reviews } = props;
  console.log('***reviews are', reviews);
  // const {
  //   createdAt,
  //   firstName,
  //   itemId,
  //   lastName,
  //   rating,
  //   review,
  //   updatedAt,
  //   userId,
  //   _id,
  // } = props;
  return (
    <div>
      {reviews &&
        reviews.map((review) => (
          <div>
            {review.createdAt}
            <br />
            {review.itemId}
            <br />
            {review.firstName}
            <br />
            {review.lastName} <br />
            {review.rating} <br />
            {review.review}
            <br />
            {review.updatedAt}
            <br />
            {review.userId}
            <br />
            {review._id}
            <br />
            <hr />
          </div>
        ))}
    </div>
  );
}
export default Review;
