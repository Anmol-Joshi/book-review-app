/* eslint-disable no-useless-constructor */
import axios from 'axios';
import React from 'react';
import ProductDetailPageProduct from './Components/ProductDetailPageProduct/ProductDetailPageProduct';
import ProductDetailPageReview from './Components/ProductDetailPageReview/ProductDetailPageReview';
class ProductDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.isLoaded = false;
    this.product = {};
  }
  componentDidMount() {
    axios
      .get(
        `https://best-read.herokuapp.com/api/items/${this.props.match.params.id}`
        // `https://localhost:4000/api/items/${this.props.match.params.id}`
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
        {console.log('***', this.state)}
        <div>{this.props.match.params.id}</div>
        {console.log(this.state)}
        {/* {!this.state && console.log('Not null')} */}
        {this.state !== null && (
          <ProductDetailPageProduct
            title={this.state.product.title}
            author={this.state.product.author}
            category={this.state.product.category}
            description={this.state.product.description}
            image={this.state.product.image}
            pages={this.state.product.pages}
            ratingSum={this.state.product.ratingSum}
            totalRatings={this.state.product.totalRatings}
          />
        )}
        {this.state !== null && (
          <ProductDetailPageReview id={this.props.match.params.id} />
        )}
        {/* {console.log(this.state.isLoaded)} */}
        {/* {this.state.isLoaded !== false ? (
          <ProductDetailPageProduct product={this.state.product} />
        ) : (
          <div></div>
        )} */}
        {/* {!this.state.isLoaded && <div>this.state.product</div>} */}
        {/* <div>{this.state.product}</div> */}
        {/* <div>{this.state.product.title}</div>
      <div>{this.state.product.pages}</div>
      <div>{this.state.product.description}</div>
      <div>{this.state.product.ratingSum}</div>
      <div>{this.state.product.totalRating}</div> */}
        {/* <div>{this.state.product}</div>
      <div>{this.state.product}</div>
      <div>{this.state.product}</div> */}
      </div>
    );
  }
}

export default ProductDetailsPage;
