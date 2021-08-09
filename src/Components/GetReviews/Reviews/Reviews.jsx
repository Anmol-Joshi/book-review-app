import React from 'react';
import './Reviews.css';

function Review(props) {
  let reviews=[];
  {reviews}= props;
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
      for(let i=0;i<reviews.length;i++){
        reviews[i].createdAt
      }

    </div>
  );
}
export default Review;
