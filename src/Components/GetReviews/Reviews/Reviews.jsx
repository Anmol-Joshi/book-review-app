import React from 'react';
import './Reviews.css';

function Review(props) {
  const { reviews } = props;
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
      {reviews.map((review) => (
        <div>{review.createdAt}</div>
      ))}
    </div>
  );
}
export default Review;
