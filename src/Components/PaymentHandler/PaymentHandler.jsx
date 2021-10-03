import React from 'react';
import './PaymentHandler.css';
import { initiatePayment } from '../../Payments';
import axios from 'axios';
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
</style>;
class PaymentHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // const totalAmount = props.totalAmount;
  }

  handlePayment = (e) => {
    e.preventDefault();
    console.log(this.props);
    function onOrderCreateFailure(err) {
      console.log(err);
      alert(`Please sign in before proceeding for payment`);
    }
    const paymentHandlers = {
      onDismiss: function () {
        console.log('Payment dismissed');
      },
      onSuccess: function (response, id, amount, currency) {
        // console.log(response);
        // console.log(id);
        // console.log(amount);
        // console.log(currency);
        // // console.log('Call put api from here');
        // console.log(response.id);
        // axios.put('orders/response.id',{})
        // http://localhost:4000/api/orders/6150307ea9ff497bf4e7b5ec
        axios
          .put(
            // `https://best-read.herokuapp.com/api/items/${this.props.id}/reviews`,
            // `http://localhost:4000/api/orders/${response.id}`,
            `/api/orders/${response.id}/`,
            response,
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
            alert('Order placed ');
            window.location = '/profile';
          })
          .catch((err) => {
            console.log('line 46 payment handler error is', err);
            // if (err.response.status == 401) {
            //   alert('Please login ');
            // } else {
            //   alert(err);
            // }
            console.log(this.session);
            console.log(err);
          });
      },
    };
    initiatePayment(paymentHandlers, onOrderCreateFailure);
  };
  render() {
    console.log('totalAmount is', this.props.totalAmount);
    return (
      <div>
        <button
          className="button"
          onClick={(e) => {
            this.handlePayment(e);
          }}
        >
          Pay Now
        </button>
      </div>
    );
  }
}
export default PaymentHandler;
