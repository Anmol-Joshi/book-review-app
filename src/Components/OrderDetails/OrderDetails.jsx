import axios from 'axios';
import React from 'react';
import './OrderDetails.css';
import OrderDetail from './OrderDetail.jsx'
class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
    this.state = { isLoaded: false };
  }
  componentDidMount() {
    axios.get('/api/orders').then((res) => {
      console.log(res);
      this.setState({ orders: res.data });
      this.setState({ isLoaded: true});
    });
  }
  render() {
    const isLoaded=this.state.isLoaded;
    let pastOrders;
    if(isLoaded){
      pastOrders=<div className='orderDetailMainDiv'>Past Order Details are: {this.state.orders.map((order)=>(<OrderDetail key={order._id}order={order}/>))}</div>
    }else{
      pastOrders=<div className='orderDetailMainDiv'>No Past Orders Found</div>
    }
    return <div>
      {pastOrders}
    </div>
}}
export default OrderDetails;
