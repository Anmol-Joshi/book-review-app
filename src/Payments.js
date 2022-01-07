import axios from 'axios';
function initiatePayment(paymentHandlers, onOrderCreateFailure) {
  axios
    .post('/api/orders', {
      withCredentials: true,
    })
    .then(
      (res) => {
        const options = {
          key: process.env.REACT_APP_RZP_KEY_ID,

          amount: res.data.amount,
          currency: res.data.currency,
          order_id: res.data.rzpOrderId,
          name: 'Best reads',
          image:
            'https://angel.co/images/static_pages/logo/AngelList_Black_Victory_Hand.png',
          description: 'E-commerce',
          theme: {
            color: '#276ef1',
          },
          modal: {
            ondismiss:
              paymentHandlers.onDismiss ||
              (() => {
                console.log('modal dismissed');
              }),
            escape: false,
          },
          handler: (response) => {
            paymentHandlers.onSuccess &&
              paymentHandlers.onSuccess({
                ...response,
                id: res.data.orderId,
                amount: res.data.amount,
                currency: res.data.currency,
              });
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      },
      (err) => {
        onOrderCreateFailure && onOrderCreateFailure(err);
      }
    );
}

export { initiatePayment };
