import React from 'react';
import './ProductDetailPageCartHandler.css';
import Button from '../Button/Button';
import axios from 'axios';

class ProductDetailPageCartHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }
  handleAddToCart = (e) => {
    e.preventDefault();
    const postData = {
      itemId: this.props.itemId,
      quantity: this.state.quantity,
      title: this.props.title,
      author: this.props.author,
      description: this.props.description,
      pages: this.props.pages,
      publishDate: this.props.publishDate,
      image: this.props.image,
      category: this.props.category,
      ratingSum: this.props.ratingSum,
      totalRatings: this.props.totalRatings,
      price: this.props.price,
    };
    axios
      // .post('http://localhost:3000/api/cart', postData, {
      .post('/api/cart/', postData, {
        withCredentials: true,
      })
      .then(() => {
        console.log('Items added to cart');
        alert('Items added to cart');
      })
      .catch(() => {
        console.log('Error occured while adding items to cart');
        alert('Error occured while adding items to cart');
      });
  };
  handleDeleteFromCart = (e) => {
    e.preventDefault();
    console.log(this.props);
    const deleteData = {
      itemId: this.props.itemId,
      // quantity: this.state.quantity,
      // title: this.props.title,
      // author: this.props.author,
      // description: this.props.description,
      // pages: this.props.pages,
      // publishDate: this.props.publishDate,
      // image: this.props.image,
      // category: this.props.category,
      // ratingSum: this.props.ratingSum,
      // totalRatings: this.props.totalRatings,
      // price: this.props.price,
    };
    console.log('deleteData is', deleteData);
    axios
      .delete(
        // 'http://localhost:3000/api/cart/',
        '/api/cart/',
        { data: deleteData },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log('Items deleted from cart');
        alert('Items deleted from cart');
      })
      .catch((err) => {
        console.log(err);
        console.log('Error occured while deleting from cart');
        alert('Error occured while deleting from cart');
      });
  };
  render() {
    return (
      <div className="cart-handler-buttons">
        <form className="cart-form" onSubmit={this.handleSubmit}>
          <label className="review-form-label">
            {/* <div className="cart-quantity-heading">Quantity:-</div> */}
            {/* <input
              type="text"
              onChange={(e) => this.setState({ rating: e.target.value })}
              value={this.state.rating}
            /> */}
            <select
              className="review-options"
              name="category"
              value={this.state.quantity}
              onChange={(e) => {
                this.setState({ quantity: e.target.value });
                console.log(e.target.value);
                this.setState({ quantity: e.target.value }, () => {
                  console.log(
                    'this.state.quantity inside this.setState',
                    this.state.quantity
                  );
                });
                console.log('this.state.quantity', this.state.quantity);
              }}
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
          {/* <label className="review-form-label"> */}
          {/* <div className="review-heading">Review:-</div> */}
          {/* <textarea
              type="text"
              onChange={(e) => this.setState({ review: e.target.value })}
              value={this.state.review}
            /> */}
          {/* </label> */}
          <button
            className="button"
            onClick={(e) => {
              this.handleAddToCart(e);
            }}
          >
            Add to Cart
          </button>
          {/* <Button
            onClick={(e) => {
              this.handleAddToCart(e);
            }}
            text="Add to Cart"
          /> */}
          <br />
          {/* <Button text="Delete from Cart" /> */}
          <button
            className="button"
            onClick={(e) => {
              this.handleDeleteFromCart(e);
            }}
          >
            Delete from Cart
          </button>
        </form>
      </div>
    );
  }
}
export default ProductDetailPageCartHandler;
