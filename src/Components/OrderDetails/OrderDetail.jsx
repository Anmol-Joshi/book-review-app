import React from 'react';
import './OrderDetails.css';
function OrderDetail(props) {
  return (
    <div className="orderDetailDiv">
      <div>Order id: {props.order.userId}</div>
      <div>Ordered on: {props.order.createdAt.split('T')[0]}</div>
      <div>Currency: {props.order.currency}</div>
      <div>Amount: {props.order.amount / 100}</div>
      <div>Order Status: {props.order.status}</div>
    </div>
  );
}
export default OrderDetail;
