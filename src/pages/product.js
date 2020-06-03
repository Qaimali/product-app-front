import React, { useState } from "react";
import ProductForm from "../components/productForm";
import ProductList from "../components/productList";
import "../sass/main.scss";
const Product = (props) => {
  return (
    <div className="container">
      <ProductForm />
      <ProductList />
    </div>
  );
};
export default Product;
