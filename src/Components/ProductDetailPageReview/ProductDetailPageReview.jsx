/* eslint-disable no-useless-constructor */
import { Link } from 'react-router-dom';
import React from 'react';
import './ProductDetailPageReview.css';
import PostReview from '../PostReview/PostReview';
import GetReviews from '../GetReviews/GetReviews';

class ProductDetailPageReview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        product detail page review
        <div>{this.props.id}</div>
        <PostReview id={this.props.id} />
        <GetReviews id={this.props.id} />
      </div>
    );
  }
}

export default ProductDetailPageReview;
