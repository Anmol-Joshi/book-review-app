import React from 'react';
import './CartItems.css';
import CartItem from '../CartItem/CartItem';
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
</style>;
function CartItems(props) {
  const { cartItems } = props;
  console.log('cartItems props', props);
  console.log(cartItems);
  return (
    <div>
      <h1>Cart Items</h1>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
export default CartItems;
