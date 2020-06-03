import { FETCH_PRODUCTS } from "../constants/products";
const product_initialState = {
  products: [],
};

export default function (state = product_initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_PRODUCTS: // start fetching posts and set loading = true
      var productsCopy = Object.assign([], state.products);
      productsCopy = action.payload;

      return { ...state, products: productsCopy };
    default:
      console.log("default is firing");
      return { ...state };
  }
}
