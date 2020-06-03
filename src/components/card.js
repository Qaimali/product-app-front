import React, { useState } from "react";
import "../sass/main.scss";
const Card = (props) => {
  return (
    <div className="card">
      <img src={props.path} alt="Avatar" width="40px" height="40px" />
      <div>
        <h4>
          <b>{props.name}</b>
        </h4>
        <p>Quantity: {props.quantity}</p>
      </div>
    </div>
  );
};
export default Card;
