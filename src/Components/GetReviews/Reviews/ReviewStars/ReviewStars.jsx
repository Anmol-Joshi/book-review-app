import React from 'react';
import './ReviewStars.css';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

function ReviewStars(props) {
  const { rating } = props;
  if (rating < 1) {
    return (
      <div className="rating-stars-main">
        <FaStarHalfAlt />
      </div>
    );
  } else if (rating === 1) {
    return (
      <div className="rating-stars-main">
        <FaStar />
      </div>
    );
  } else if (rating < 2) {
    return (
      <div className="rating-stars-main">
        <FaStar />
        <FaStarHalfAlt />
      </div>
    );
  } else if (rating === 2) {
    return (
      <div className="rating-stars-main">
        <FaStar />
        <FaStar />
      </div>
    );
  } else if (rating < 3) {
    return (
      <div className="rating-stars-main">
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </div>
    );
  } else if (rating === 3) {
    return (
      <div className="rating-stars-main">
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    );
  } else if (rating < 4) {
    return (
      <div className="rating-stars-main">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </div>
    );
  } else if (rating === 4) {
    return (
      <div className="rating-stars-main">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    );
  } else if (rating < 5) {
    return (
      <div className="rating-stars-main">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </div>
    );
  } else if (rating === 5) {
    return (
      <div className="rating-stars-main">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    );
  }
}

export default ReviewStars;
