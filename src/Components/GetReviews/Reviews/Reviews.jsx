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
      {console.log(reviews)}
      {/* {reviews.map((review) => (
        <div>{review.createdAt}</div>
      ))} */}
    </div>
  );
}
export default Review;
