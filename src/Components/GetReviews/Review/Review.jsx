import React from 'react';
import './Review.css';
import './Review.css';

function Review(props) {
  const {
    createdAt,
    firstName,
    itemId,
    lastName,
    rating,
    review,
    updatedAt,
    userId,
    _id,
  } = props;
  return (
    <div>
      {createdAt},{firstName},{itemId},{lastName},{rating},{review},{updatedAt},
      {userId},{id}
      <hr />
    </div>
  );
}
export default Review;
