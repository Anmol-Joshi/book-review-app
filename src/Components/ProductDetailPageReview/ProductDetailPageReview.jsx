import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';
import './ProductDetailPageReview.css';

class ProductDetailPageReview extends React.Component {
  constructor(props) {
    const { id } = props;
    super(props);
    this.state = {
      review: '',
      rating: 1,
    };
  }
  handleSubmit = (event) => {
    const postData = {
      review: this.state.review,
      rating: this.state.rating,
    };
    if (this.state.review === '' || this.state.rating === '') {
      alert('Rating/Review cannot be empty');
    } else {
      console.log(postData);
      axios
        .post(
          `http://localhost:4000/api/items/${this.props.id}/reviews`,
          postData
        )
        .then(() => {
          alert('review submitted');
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
          }
        });
    }
    // alert('A review was submitted: ' + this.state.review + this.state.rating);
    event.preventDefault();
  };
  render() {
    return (
      <div>
        product detail page review
        <div>{this.props.id}</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Review
            <input
              type="text"
              onChange={(e) => this.setState({ review: e.target.value })}
              value={this.state.review}
            />
          </label>
          <label>
            Rating
            <input
              type="text"
              onChange={(e) => this.setState({ rating: e.target.value })}
              value={this.state.rating}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ProductDetailPageReview;
