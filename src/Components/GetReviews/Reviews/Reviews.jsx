import React from 'react';
import './Reviews.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Review(props) {
  let { reviews, id } = props;
  // console.log('***reviews are', reviews);
  // console.log('**** id is', id);
  // console.log('**** userId is', this.session.userId);
  // req.session.userId
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
  {
    /* this.props.id !== review.userId && */
  }
  return (
    <div>
      {reviews &&
        reviews.map((review) => (
          <div key={review._id}>
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
            {/* <FontAwesomeIcon className="f2ed" size="2x" /> */}
            {/* <i class="fas fa-trash-alt"></i> */}
            {/* <button className="btn">
              <i className="fa fas fa-trash-alt"></i>
            </button> */}
            <hr />
          </div>
        ))}
    </div>
  );
}
export default Review;
