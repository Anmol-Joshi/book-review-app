import React from 'react';
import './CartItem.css';
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
</style>;
function CartItem(props) {
  const { item } = props;
  const image = item.image;
  const title = item.title;
  const author = item.author;
  const quantity = item.quantity;
  const price = item.price;
  console.log('item is', item);
  return (
    <div className="cart-item-group">
      <img src={image} alt="cart item" className="cart-item-image" />
      <div className="cart-product-info">
        <div className="cart-item-title">Title:-{title}</div>
        <div className="cart-item-author">Author:-{author}</div>
        <div className="cart-item-quantity">Quantity:-{quantity}</div>
        <div className="cart-item-price">Rs.{price / 100}</div>
      </div>
    </div>
  );
}
export default CartItem;
