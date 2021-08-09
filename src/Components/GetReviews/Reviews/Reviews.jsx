import React from 'react';
import './Reviews.css';
import { FontAwesomeIcon, f2ed } from '@fortawesome/react-fontawesome';

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
            <FontAwesomeIcon icon={f2ed} size="xs" />
            <i class="fas fa-trash-alt"></i>
            <hr />
          </div>
        ))}
    </div>
  );
}
export default Review;
