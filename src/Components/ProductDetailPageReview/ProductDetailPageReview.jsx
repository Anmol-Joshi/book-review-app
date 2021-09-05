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
      // .get(`https://best-read.herokuapp.com/api/items/${this.props.id}/reviews`)
      .get(`http://localhost:4000/api/items/${this.props.id}/reviews`)
      .then((res) => {
        this.setState({ reviews: res, isLoaded: true });

        // console.log('***GetReviews', this.state.reviews.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        product detail page review
        <div>{this.props.id}</div>
        <PostReview id={this.props.id} />
        <GetReviews
          id={this.props.id}
          isLoaded={this.state.isLoaded}
          reviews={this.state.reviews}
          // id={this.props.id}
        />
      </div>
    );
  }
}

export default ProductDetailPageReview;
