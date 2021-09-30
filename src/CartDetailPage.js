import axios from 'axios';
import React from 'react';
import CartItems from './Components/CartItems/CartItems';
import Navbar from './Components/Navbar/Navabar';
import PaymentHandler from './Components/PaymentHandler/PaymentHandler';
import './CartDetailPage.css';
axios.defaults.withCredentials = true;
class CartDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // this.isLoaded = false;
    this.state = {
      cartItems: [],
      totalAmount: 0,
      isLoaded: false,
    };
    // this.cart = [];
  }
  componentDidMount() {
    axios
      // .get(`http://localhost:4000/api/cart/`, {
      .get(`/api/cart/`, {
        // withCredentials: true,
      })
      .then((res) => {
        this.setState({ cartItems: res.data.cartItems });
        this.setState({ totalAmount: res.data.totalAmount });
        this.setState({ isLoaded: true });
        console.log('CartDetail Page res', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log('Cart detail Page cart is', this.state.cartItems);
    console.log('Cart detail Page res is', this.state.totalAmount);
    return (
      <div>
        <Navbar />
        <div className="cart-detail-page-main">
          {this.state.isLoaded && this.state.cartItems && (
            <CartItems cartItems={this.state.cartItems} />
          )}
          {this.state.isLoaded && !this.state.cartItems && (
            <h1>Cart is empty</h1>
          )}
          {this.state.isLoaded && this.state.cartItems && (
            <div>Total:- Rs.{this.state.totalAmount / 100}</div>
          )}
          {this.state.isLoaded && this.state.cartItems && (
            <PaymentHandler
              totalAmount={this.state.totalAmount}
              cartItems={this.state.cartItems}
            />
          )}
        </div>
      </div>
    );
  }
}
export default CartDetailPage;
