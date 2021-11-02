import React from 'react';
import './ProductDetailPageProduct.css';
import ProductDetailPageCartHandler from '../ProductDetailPageCartHandler/ProductDetailPageCartHandler';
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
</style>;
function ProductDetailPageProduct(props) {
  const {
    id,
    title,
    author,
    category,
    description,
    image,
    pages,
    ratingSum,
    totalRatings,
    price,
  } = props;

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
          <div className="price">
            <div className="price-title">Price:</div>
            {price / 100} Rs
          </div>
          <div className="quantity">
            <div className="quantity-title">Quantity:-</div>
          </div>

          <ProductDetailPageCartHandler
            itemId={id}
            title={title}
            author={author}
            description={description}
            pages={pages}
            image={image}
            category={category}
            ratingSum={ratingSum}
            totalRatings={totalRatings}
            price={price}
          />
        </div>
      </div>
      <div className="description">
        <div className="description-title">Description:</div>
        {description}
      </div>
    </div>
  );
}

export default ProductDetailPageProduct;
