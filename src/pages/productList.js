import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store/actions/product";
import Card from "../components/card";
const ProductList = (props) => {
  const product_list = useSelector((state) => state.product_reducers.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  console.log(product_list);
  return (
    <div>
      {product_list
        ? product_list.map((elem, index) => (
            <Card
              key={index}
              path={elem.imageUrl}
              name={elem.name}
              quantity={elem.quantity}
            />
          ))
        : "uu"}
    </div>
  );
};
export default ProductList;
