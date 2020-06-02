import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import product_reducers from "./reducers/products";
const rootReducers = combineReducers({
  product_reducers: product_reducers,
});
const store = createStore(rootReducers, applyMiddleware(thunk));
export default store;
