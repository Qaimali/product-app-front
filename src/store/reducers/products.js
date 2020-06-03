import { ADD_PRODUCT, FETCH_PRODUCTS } from "../constants/products";
const product_initialState = {
  products: [],
};

export default function (state = product_initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_PRODUCTS: // start fetching posts and set loading = true
      console.log("I am from Reduce nFEtching..");
      console.log(action.payload);
      var productsCopy = Object.assign([], state.products);
      productsCopy = action.payload;
      console.log(productsCopy);
      return { ...state, products: productsCopy };
    default:
      console.log("default is firing");
      return { ...state };
  }
}
