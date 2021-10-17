import React from 'react';
import axios from 'axios';
import './GetReviews.css';
import Reviews from './Reviews/Reviews.jsx';
class GetReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = { reviews: this.props.reviews, isLoaded: props.isLoaded };
  }

  render() {
    return (
      <div className="get-reviews-div">
        <Reviews reviews={this.props.reviews.data} id={this.props.id} />
      </div>
    );
  }
}
export default GetReviews;
