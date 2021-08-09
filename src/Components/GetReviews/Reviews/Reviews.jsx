import React from 'react';
import './Reviews.css';

function Review(props) {
  let reviews = [];
  reviews = props.reviews;
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
      {reviews.map((review) => {
        return <div>{console.log(review)}</div>;
      })}
    </div>
  );
}
export default Review;
