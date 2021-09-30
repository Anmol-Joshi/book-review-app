import React from 'react';
import './RatingStars.css';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

function RatingStars(props) {
  const { ratingSum } = props;
  const { totalRatings } = props;

  if (totalRatings === 0) {
    return (
      <div className="rating-stars-main">
        0<FaRegStar />
      </div>
    );
  } else {
    const averageRating = ratingSum / totalRatings;
    if (averageRating < 1) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStarHalfAlt />
        </div>
      );
    } else if (averageRating === 1) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
        </div>
      );
    } else if (averageRating < 2) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
          <FaStarHalfAlt />
        </div>
      );
    } else if (averageRating === 2) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
          <FaStar />
        </div>
      );
    } else if (averageRating < 3) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
      );
    } else if (averageRating === 3) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      );
    } else if (averageRating < 4) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
      );
    } else if (averageRating === 4) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      );
    } else if (averageRating < 5) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
      );
    } else if (averageRating === 5) {
      return (
        <div className="rating-stars-main">
          {totalRatings}
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      );
    }
  }
}
export default RatingStars;
