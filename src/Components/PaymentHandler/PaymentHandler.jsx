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
  }

  handlePayment = (e) => {
    e.preventDefault();
    function onOrderCreateFailure(err) {
      console.log(err);
      alert(`Please sign in before proceeding for payment`);
    }
    const paymentHandlers = {
      onDismiss: function () {
        console.log('Payment dismissed');
      },
      onSuccess: function (response, id, amount, currency) {
        axios
          .put(`/api/orders/${response.id}/`, response, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            alert('Order placed ');
            window.location = '/profile';
          })
          .catch((err) => {
            console.log('line 46 payment handler error is', err);
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
