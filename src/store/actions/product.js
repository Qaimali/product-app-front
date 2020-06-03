import { ADD_PRODUCT, FETCH_PRODUCTS } from "../constants/products";
import store from "../index";
import { API_BASE_URL } from "../../config";

export function fetchTasks() {
  fetch(API_BASE_URL + "get_all", {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    mode: "cors",
  }).then((response) => {
    response
      .json()
      .then((data) => {
        console.log("data fetched");
        console.log(data);
        store.dispatch({
          type: FETCH_PRODUCTS,
          payload: data.products,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return { type: "NEW", payload: "none" };
}
export function addtasks(name, quantity, imageUrl) {
  var product = {
    name: name,
    quantity: quantity,
    imageUrl: imageUrl,
  };
  console.log(addtasks);
  fetch(API_BASE_URL + "add_product", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    mode: "cors",
    body: JSON.stringify(product),
  }).then((response) => {
    response
      .json()
      .then((data) => {
        console.log("data");
        store.dispatch({
          type: ADD_PRODUCT,
          payload: data,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
        store.dispatch({
          type: ADD_PRODUCT,
          payload: [],
        });
        return;
      });
  });

  return { type: "NEW", payload: "none" };
}
