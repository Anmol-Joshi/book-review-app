import axios from 'axios';
import React from 'react';
import './OrderDetails.css';
class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }
  componentDidMount() {
    axios.get('/api/orders').then((res) => {
      console.log(res);
      this.setState({ orders: res.data });
    });
  }
  render() {
    return <div>Past Order Details:-</div>;
  }
}
export default OrderDetails;
