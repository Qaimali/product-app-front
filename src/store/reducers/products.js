import { ADD_PRODUCT, FETCH_PRODUCTS } from "../constants/products";
const account_initialState = {
  products: [],
};
export default function (state = account_initialState, action) {
  return { ...state };
}
