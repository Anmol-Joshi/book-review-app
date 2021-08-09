/* eslint-disable no-useless-constructor */
import { Link } from 'react-router-dom';
import React from 'react';
import './ProductDetailPageReview.css';
import PostReview from '../PostReview/PostReview';

class ProductDetailPageReview extends React.Component {
  constructor(props) {
    super(props);
  }
  // handleSubmit = (event) => {
  //   const postData = {
  //     review: this.state.review,
  //     rating: this.state.rating,
  //   };
  //   if (this.state.review === '' || this.state.rating === '') {
  //     alert('Rating/Review cannot be empty');
  //   } else {
  //     console.log(postData);
  //     axios
  //       .post(
  //         `https://best-read.herokuapp.com/api/items/${this.props.id}/reviews`,
  //         postData
  //       )
  //       .then(() => {
  //         alert('review submitted');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   // alert('A review was submitted: ' + this.state.review + this.state.rating);
  //   event.preventDefault();
  // };
  render() {
    return (
      <div>
        product detail page review
        <div>{this.props.id}</div>
        <PostReview />
      </div>
    );
  }
}

export default ProductDetailPageReview;
