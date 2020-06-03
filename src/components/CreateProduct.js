import React, { useState } from "react";
import ProductForm from "../components/productForm";
import "../sass/main.scss";
const CreateProduct = (props) => {
  return (
    <div className="container">
      <ProductForm />
    </div>
  );
};
export default CreateProduct;
