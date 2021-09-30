import { Link } from 'react-router-dom';
import React from 'react';
import './Product.css';
import RatingStars from '../RatingStars/RatingStars';

function Product(props) {
  const { product } = props;
  console.log('product is', product);
  const { _id, title, ratingSum, totalRatings, image, price, author } = product;
  // console.log(_id);
  return (
    <div key={_id} className="individual-product">
      {/* <Link to={`/productdetailpage/${product.id}`}> */}
      {/* <Link to={`/productdetailpage/${_id}`} style={{ color: '#000' }}> */}
      {/* {console.log({ _id }, 'id is')} */}
      <div className="product-card">
        <div className="product-cart-image">
          <Link to={`/productdetailpage/${_id}`} style={{ color: '#000' }}>
            <img
              src={image}
              width="150"
              height="200"
              style={{
                border: '2px solid black',
              }}
              alt={title}
            />
          </Link>
        </div>
        <div className="product-card-details">
          <Link to={`/productdetailpage/${_id}`} style={{ color: '#000' }}>
            <div className="product-card-title">{title}</div>
          </Link>
          <div className="product-card-author">{author}</div>
          <div className="product-cart-rating">
            {/* {totalRatings !== 0 && (
              <div className="average-rating">{ratingSum / totalRatings}</div>
            )} */}
            <RatingStars totalRatings={totalRatings} ratingSum={ratingSum} />
          </div>
          <div className="product-card-price">Rs.{price / 100}</div>
          {/* <div className="product-card-title">{title}</div> */}
        </div>
      </div>
      {/* <div>{ratingSum && totalRatings && ratingSum / totalRatings}</div> */}
      {/* <div>{totalRatings}</div> */}
      {/* </Link> */}
    </div>
  );
}
export default Product;
