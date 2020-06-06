import React, { useReducer, createContext } from "react";

import { API_BASE_URL } from "../config";
import { act } from "react-dom/test-utils";

export const ProductContext = createContext();

const ADD_PRODUCT = "ADD_PRODUCT";
const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const initialState = [];

const reducer = (state = initialState, action) => {
  console.log(action.type);

  if (action.type === FETCH_PRODUCTS) {
    return action.payload;
  }
  if (action.type === ADD_PRODUCT) {
    return [...state, action.payload];
  }
  return state;
};

export const ProductProvider = ({ children }) => {
  const [product_list, dispatch] = useReducer(reducer, initialState);

  const addTasks = (name, quantity, imageUrl) => {
    var product = {
      name: name,
      quantity: quantity,
      imageUrl: imageUrl,
    };

    fetch(API_BASE_URL + "add_product", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      mode: "cors",
      body: JSON.stringify(product),
    }).then((response) => {
      response
        .json()
        .then((data) => {
          dispatch({
            type: ADD_PRODUCT,
            payload: data.product,
          });
          return;
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: ADD_PRODUCT,
            payload: [],
          });
          return;
        });
    });
  };

  const fetchTasks = () => {
    fetch(API_BASE_URL + "get_all", {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      mode: "cors",
    }).then((response) => {
      response
        .json()
        .then((data) => {
          dispatch({
            type: FETCH_PRODUCTS,
            payload: data.products,
          });
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  const value = { product_list, addTasks, fetchTasks };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
