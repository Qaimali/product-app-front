import React from "react";
import store from "./store/index";
import { Provider } from "react-redux";
import DropFile from "./pages/DragAndDropImage";
import Product from "./pages/product";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Product />
        <DropFile />
      </div>
    </Provider>
  );
}

export default App;
