import axios from 'axios';
import React from 'react';
import CartItems from './Components/CartItems/CartItems';
import Navbar from './Components/Navbar/Navabar';
import PaymentHandler from './Components/PaymentHandler/PaymentHandler';
import './CartDetailPage.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
axios.defaults.withCredentials = true;
class CartDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      totalAmount: 0,
      isLoaded: false,
    };
  }
  componentDidMount() {
    axios
      .get(`/api/cart/`, {
        // withCredentials: true,
      })
      .then((res) => {
        this.setState({ cartItems: res.data.cartItems });
        this.setState({ totalAmount: res.data.totalAmount });
        this.setState({ isLoaded: true });
      })
      .catch((err) => {});
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.state.isLoaded === false && (
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
