import React from 'react';
import axios from 'axios';
import './GetReviews.jsx';
import Review from './Review/Review';
class GetReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [], isLoaded: false };
  }
  componentDidMount() {
    axios
      .get(`https://best-read.herokuapp.com/api/items/${this.props.id}/reviews`)
      .then((res) => {
        this.setState({ reviews: res, isLoaded: true });

        console.log(this.state.reviews.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {console.log(this.state.isLoaded)}
        {this.state.isLoaded === true &&
          this.state.reviews.map((review) => <Review props={review} />)}
      </div>
    );
  }
}
export default GetReviews;
