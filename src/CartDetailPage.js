import axios from 'axios';
import React from 'react';
import CartItems from './Components/CartItems/CartItems';
import Navbar from './Components/Navbar/Navabar';
axios.defaults.withCredentials = true;
class CartDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // this.isLoaded = false;
    this.state = {
      cartItems: [],
      isLoaded: false,
    };
    // this.cart = [];
  }
  componentDidMount() {
    axios
      .get(`http://localhost:4000/api/cart/`, {
        // withCredentials: true,
      })
      .then((res) => {
        this.setState({ cartItems: res.data.cartItems });
        this.setState({ isLoaded: true });
        console.log('CartDetail Page res', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log('Cart detail Page cart is', this.state.cartItems);
    return (
      <div>
        <Navbar />
        {this.state.isLoaded && <CartItems cartItems={this.state.cartItems} />}
      </div>
    );
  }
}
export default CartDetailPage;
