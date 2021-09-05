import React from 'react';
import './Products.css';
import Product from '../Product/Product';
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
</style>;
function Products(props) {
  console.log(props.products);
  const { products } = props;
  return (
    <div>
      <h1 className="product-list-heading">Product List</h1>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}

export default Products;
