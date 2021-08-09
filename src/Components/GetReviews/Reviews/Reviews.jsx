import React from 'react';
import './Reviews.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <FontAwesomeIcon icon="check-square" />
            <hr />
          </div>
        ))}
    </div>
  );
}
export default Review;
