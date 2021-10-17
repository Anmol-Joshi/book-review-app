import React from 'react';
import './Reviews.css';
import ProfileIcon from '../../../icons/account_circle.svg';
import ReviewStars from './ReviewStars/ReviewStars';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Review(props) {
  let { reviews, id } = props;
  console.log('review props', props);

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
                <b>
                  {review.firstName} {review.lastName}{' '}
                </b>
                reviewed on <b>{review.createdAt.split('T')[0]}</b>
                <br />
                <ReviewStars rating={review.rating} />
                {review.review}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
export default Review;
