import { Link } from 'react-router-dom';
import React from 'react';
import './Product.css';

function Product(props) {
  const { product } = props;
  const { _id, title, ratingSum, totalRatings, image } = product;
  // console.log(_id);
  return (
    <div key={_id} className="individual-product">
      {/* <Link to={`/productdetailpage/${product.id}`}> */}
      <Link to={`/productdetailpage/${_id}`} style={{ color: '#000' }}>
        {/* {console.log({ _id }, 'id is')} */}
        <div className="product-card">
          <div className="product-cart-image">
            <img
              src={image}
              width="150"
              height="200"
              style={{
                border: '2px solid black',
              }}
              alt={title}
            />
          </div>
          <div className="product-card-details">
            <div className="product-card-title">{title}</div>
            <div className="product-cart-rating">
              {totalRatings !== 0 && (
                <div className="average-rating">{ratingSum / totalRatings}</div>
              )}
            </div>
          </div>
        </div>
        {/* <div>{ratingSum && totalRatings && ratingSum / totalRatings}</div> */}
        {/* <div>{totalRatings}</div> */}
      </Link>
    </div>
  );
}
export default Product;
