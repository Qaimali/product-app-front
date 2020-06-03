import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store/actions/product";
import Card from "./card";
import "../sass/main.scss";
const ProductList = (props) => {
  const product_list = useSelector((state) => state.product_reducers.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  console.log(product_list);
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
        {product_list && product_list.length == 0 && (
          <div>
            <b>No Product Availble, Add some!</b>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default ProductList;
