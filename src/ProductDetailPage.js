/* eslint-disable no-useless-constructor */
import axios from 'axios';
import React from 'react';
import ProductDetailPageProduct from './Components/ProductDetailPageProduct/ProductDetailPageProduct';
import ProductDetailPageReview from './Components/ProductDetailPageReview/ProductDetailPageReview';
import Navbar from './Components/Navbar/Navabar';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './ProductDetailPage.css';
class ProductDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.isLoaded = false;
    this.product = {};
  }
  componentDidMount() {
    axios
      .get(`/api/items/${this.props.match.params.id}/`)
      .then((res) => {
        this.setState({ product: res.data });
        this.setState({ isLoaded: true });
      })
      .catch((err) => {
        console.log('error occurred', err);
      });
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="product-detail-page-main">
          {this.state === null && (
            <div>
              <Loader
                className="loader"
                type="ThreeDots"
                color="#000000"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </div>
          )}
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
      </div>
    );
  }
}

export default ProductDetailsPage;
