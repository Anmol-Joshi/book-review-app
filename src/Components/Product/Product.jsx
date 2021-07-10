import { Link } from 'react-router-dom';
import React from 'react';
import './Product.css';

function Product(props){
  const {product}=props
  const {_id,title,ratingSum,totalRatings,image}=product
  console.log(_id)
  return (
    <div key={_id}>
    {/* <Link to={`/productdetailpage/${product.id}`}> */}
    <Link to={`/productdetailpage/${_id}`}>
    {console.log({_id},'id is')}
      <img src={image} width="50" height="80" alt= {title} />
      {/* <div>{_id}</div> */}
      <div>{title}</div>
      <div>{ratingSum}</div>
      <div>{totalRatings}</div>
      </Link>
    </div>
    
  )
}
export default Product;
