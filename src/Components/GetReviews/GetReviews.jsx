import React from 'react';
import axios from 'axios';
import './GetReviews.jsx';
import Reviews from './Reviews/Reviews.jsx';
class GetReviews extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { reviews: [], isLoaded: false };
    // console.log('***Props are', props);
    this.state = { reviews: this.props.reviews, isLoaded: props.isLoaded };
  }
  // componentDidMount() {
  //   axios
  //     // .get(`https://best-read.herokuapp.com/api/items/${this.props.id}/reviews`)
  //     .get(`http://localhost:4000/api/items/${this.props.id}/reviews`)
  //     .then((res) => {
  //       this.setState({ reviews: res, isLoaded: true });

  //       // console.log('***GetReviews', this.state.reviews.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  render() {
    return (
      <div>
        {/* {console.log('***line 28 GetReviews', this.props.reviews)}
        {console.log('***line 29 GetReviews', this.state.reviews.data)} */}
        <hr />

        <Reviews reviews={this.props.reviews.data} id={this.props.id} />
      </div>
    );
  }
}
export default GetReviews;
