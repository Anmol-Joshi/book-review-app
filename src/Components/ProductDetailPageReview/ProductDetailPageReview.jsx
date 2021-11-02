/* eslint-disable no-useless-constructor */
import React from 'react';
import axios from 'axios';
import './ProductDetailPageReview.css';
import PostReview from '../PostReview/PostReview';
import GetReviews from '../GetReviews/GetReviews';

class ProductDetailPageReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [], isLoaded: false };
  }
  componentDidMount() {
    axios
      .get(`/api/items/${this.props.id}/reviews/`)
      .then((res) => {
        this.setState({ reviews: res, isLoaded: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h2>Post Review and Rating:-</h2>
        <PostReview id={this.props.id} />
        <GetReviews
          id={this.props.id}
          isLoaded={this.state.isLoaded}
          reviews={this.state.reviews}
        />
      </div>
    );
  }
}

export default ProductDetailPageReview;
