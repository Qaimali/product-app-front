import React, { useEffect, Fragment } from "react";
import Card from "./card";
import "../sass/main.scss";
import { ProductContext } from "../context/productContext";
const ProductList = (props) => {
  const { fetchTasks, product_list } = React.useContext(ProductContext);
  console.log(product_list);
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <Fragment>
      <h3>Products</h3>
      <div className="product-list">
        {product_list &&
          product_list.map((elem, index) => (
            <Card
              key={index}
              path={elem.imageUrl}
              name={elem.name}
              quantity={elem.quantity}
            />
          ))}
        {product_list && product_list.length === 0 && (
          <div>
            <b>No Product Availble, Add some!</b>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default ProductList;
