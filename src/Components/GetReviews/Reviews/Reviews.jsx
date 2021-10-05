import React from 'react';
import './Reviews.css';
import ProfileIcon from '../../../icons/account_circle.svg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Review(props) {
  let { reviews, id } = props;
  console.log('review props', props);
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
          <div>
            <div key={review._id} className="review-div">
              <div className="review-profile-image-div">
                <img
                  src={ProfileIcon}
                  alt="review-profile"
                  className="review-profile-image"
                />
              </div>
              <div className="review-content-div">
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
                {review._id}
              </div>
              {/* <br /> */}
              {/* <br /> */}
              {/* <FontAwesomeIcon className="f2ed" size="2x" /> */}
              {/* <i class="fas fa-trash-alt"></i> */}
              {/* <button className="btn">
              <i className="fa fas fa-trash-alt"></i>
            </button> */}
            </div>
            {/* <hr /> */}
          </div>
        ))}
    </div>
  );
}
export default Review;
