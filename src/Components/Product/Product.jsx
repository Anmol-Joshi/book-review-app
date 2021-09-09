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
          <img src={image} width="70" height="100" alt={title} />
          {/* <div>{_id}</div> */}
          <div className="product-card-title">{title}</div>
          {totalRatings !== 0 && (
            <div className="average-rating">{ratingSum / totalRatings}</div>
          )}
        </div>
        {/* <div>{ratingSum && totalRatings && ratingSum / totalRatings}</div> */}
        {/* <div>{totalRatings}</div> */}
      </Link>
    </div>
  );
}
export default Product;
