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
        <div className="row">
          <img src={productInfo.image} className="product-image" />
        </div>
        <div className="row">
          <div className="row-title">Name:</div>
          <div className="row-body">{productInfo.title}</div>
        </div>
        <div className="row">
          <div className="row-title">Name:</div>
          <div className="row-body">{productInfo.description}</div>
        </div>
        <div className="row">
          <div className="row-title">Price:</div>
          <div className="row-body">{productInfo.price}</div>
        </div>
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

export default ProductDetail;
