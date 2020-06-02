import React from "react";
import logo from "./logo.svg";
import "./App.css";
import store from "./store/index";
import CreateProduct from "./pages/CreateProduct";
import { Provider } from "react-redux";
import firebase from "firebase";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CreateProduct />
      </div>
    </Provider>
  );
}

export default App;
