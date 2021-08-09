import React from 'react';
import axios from 'axios';
import './GetReviews.jsx';
import Review from './Review/Review';
class GetReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] };
  }
  componentDidMount() {
    axios
      .get(`https://best-read.herokuapp.com/api/items/${this.props.id}/reviews`)
      .then((res) => {
        this.setState({ reviews: res });
        console.log(this.state.reviews.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {this.state.reviews.length > 0 &&
          this.state.reviews.forEach((review) => {
            <Review />;
          })}
      </div>
    );
  }
}
export default GetReviews;
