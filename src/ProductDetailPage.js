/* eslint-disable no-useless-constructor */
import axios from 'axios';
import React from 'react';
import ProductDetailPageProduct from './Components/ProductDetailPageProduct/ProductDetailPageProduct';
import ProductDetailPageReview from './Components/ProductDetailPageReview/ProductDetailPageReview';
import Navbar from './Components/Navbar/Navabar';
class ProductDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.isLoaded = false;
    this.product = {};
  }
  componentDidMount() {
    axios
      .get(
        // `https://best-read.herokuapp.com/api/items/${this.props.match.params.id}`
        // `http://localhost:4000/api/items/${this.props.match.params.id}`
        `/api/items/${this.props.match.params.id}/`
      )
      .then((res) => {
        // console.log('res is', res);
        this.setState({ product: res.data });
        this.setState({ isLoaded: true });
        // console.log('product is', this.state.product);
        // console.log(this.state.isLoaded);
      })
      .catch((err) => {
        console.log('error occurred', err);
      });
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.state !== null && (
          <ProductDetailPageProduct
            id={this.props.match.params.id}
            title={this.state.product.title}
            author={this.state.product.author}
            category={this.state.product.category}
            description={this.state.product.description}
            image={this.state.product.image}
            pages={this.state.product.pages}
            ratingSum={this.state.product.ratingSum}
            totalRatings={this.state.product.totalRatings}
            price={this.state.product.price}
          />
        )}
        {this.state !== null && (
          <ProductDetailPageReview id={this.props.match.params.id} />
        )}
      </div>
    );
  }
}

export default ProductDetailsPage;
