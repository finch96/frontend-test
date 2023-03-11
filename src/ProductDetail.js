import React, { useState, useEffect } from "react";

import { fetchProductDetail } from "./utils/api";

import "./ProductDetail.css";

function ProductDetail({ productId }) {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!productId) return;

    fetchProductDetail(productId).then((productInfo) =>
      setProductInfo(productInfo)
    );
  }, [productId]);

  const renderProductInfo = () => {
    return (
      <div className="detail-container">
        <div className="row image-container">
          <img src={productInfo.image} className="product-image" />
        </div>
        <div className="row">
          <div className="product-title">{productInfo.title}</div>
        </div>
        <div className="row">
          <div className="product-description">{productInfo.description}</div>
        </div>
        <div className="row price-container">
          <div className="product-price">£{productInfo.price}</div>
        </div>
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

export default ProductDetail;
