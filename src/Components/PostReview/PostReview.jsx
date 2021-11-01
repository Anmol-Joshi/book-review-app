import React from 'react';
import axios from 'axios';
import './PostReview.css';

class PostReview extends React.Component {
  constructor(props) {
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
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert('Please login to post review');
          } else {
            alert(err);
          }
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
        <form className="review-form" onSubmit={this.handleSubmit}>
          <label className="review-form-label">
            <div className="rating-heading">Rating:-</div>
            {/* <input
              type="text"
              onChange={(e) => this.setState({ rating: e.target.value })}
              value={this.state.rating}
            /> */}
            <select
              className="review-options"
              name="category"
              value={this.state.rating}
              onChange={(e) => this.setState({ rating: e.target.value })}
            >
              <option defaultValue id="1">
                1
              </option>
              <option id="2">2</option>
              <option id="3">3</option>
              <option id="4">4</option>
              <option id="5">5</option>
            </select>
          </label>
          <label className="review-form-label">
            <div className="review-heading">Review:-</div>
            <textarea
              type="text"
              onChange={(e) => this.setState({ review: e.target.value })}
              value={this.state.review}
            />
          </label>
          <button className="review-form-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default PostReview;
