import React from "react";
import ProductForm from "../components/productForm";
import ProductList from "../components/productList";
import "../sass/main.scss";
import { ProductProvider } from "../context/productContext";

const Product = () => {
  return (
    <ProductProvider>
      <div className="container">
        <ProductForm />
        <ProductList />
      </div>
    </ProductProvider>
  );
};
export default Product;
