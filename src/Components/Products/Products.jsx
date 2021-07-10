import React from 'react';
import './Products.css';
import Product from '../Product/Product'

function Products(props){
  console.log(props.products)
  const {products}=props;
  return (
   <div>
   <h1>Product List</h1>
    {products.map((product)=>(
      <Product key={product._id} product={product}  />

    ))}
   </div>
  )
}

export default Products;