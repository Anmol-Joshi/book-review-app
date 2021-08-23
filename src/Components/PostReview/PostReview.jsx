import React from 'react';
import axios from 'axios';
import './PostReview.css';

class PostReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      rating: '',
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
      // const token = sessionStorage.getItem('token');

      axios
        .post(
          // `https://best-read.herokuapp.com/api/items/${this.props.id}/reviews`,
          `/api/items/${this.props.id}/reviews`,
          postData,
          { withCredentials: true }
        )
        .then(() => {
          alert('review submitted');
        })
        .catch((err) => {
          console.log(this.session);
          console.log(err);
        });
    }
    // alert('A review was submitted: ' + this.state.review + this.state.rating);
    event.preventDefault();
  };
  render() {
    return (
      <div>
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
export default PostReview;
