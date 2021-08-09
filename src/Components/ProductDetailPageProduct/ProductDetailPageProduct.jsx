import { Link } from 'react-router-dom';
import React from 'react';
import './ProductDetailPageProduct.css';

function ProductDetailPageProduct(props) {
  const {
    title,
    author,
    category,
    description,
    image,
    pages,
    ratingSum,
    totalRatings,
  } = props;
  console.log('author is', author);
  let rating = 0;
  if (totalRatings !== 0) {
    rating = ratingSum / totalRatings;
  }
  return (
    <div>
      <img
        alt="product"
        src={image}
        className="product-detail-page-product-product-image"
      ></img>
      <div>Title: {title}</div>
      <div>Author: {author}</div>
      <div>Category: {category}</div>
      <div>Description:{description}</div>
      <div>Pages: {pages}</div>
      <div>Ratings: {rating}</div>
      {/* <div></div> */}
    </div>
  );
}

export default ProductDetailPageProduct;
