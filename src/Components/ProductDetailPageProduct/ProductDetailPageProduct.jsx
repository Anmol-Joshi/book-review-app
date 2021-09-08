import React from 'react';
import './ProductDetailPageProduct.css';
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
</style>;
function ProductDetailPageProduct(props) {
  const {
    title,
    author,
    category,
    description,
    image,
    pages,
    // ratingSum,
    // totalRatings,
  } = props;

  // let rating = 0;
  // if (totalRatings !== 0) {
  //   rating = ratingSum / totalRatings;
  // }
  return (
    <div>
      <div className="product-info-group">
        <img
          alt="product"
          src={image}
          className="product-detail-page-product-product-image"
        />
        <div className="product-info">
          <div className="title">
            <div className="title-title">Title:</div> {title}
          </div>
          <div className="author">
            <div className="author-title">Author:</div> {author}
          </div>
          <div className="category">
            <div className="category-title">Category:</div> {category}
          </div>
          <div className="pages">
            <div className="pages-title">Pages:</div> {pages}
          </div>
        </div>
      </div>
      <div className="description">
        <div className="description-title">Description:</div>
        {description}
      </div>

      {/* <div>Ratings: {rating}</div> */}
      {/* <div></div> */}
    </div>
  );
}

export default ProductDetailPageProduct;
