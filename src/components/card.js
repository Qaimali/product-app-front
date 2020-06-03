import React, { useState } from "react";
import "../sass/main.scss";
const Card = (props) => {
  return (
    <div className="card">
      <img src={props.path} alt="Avatar" width="40px" height="40px" />
      <div className="card-info">
        <h3>
          <b>{props.name}</b>
        </h3>
        <span>Quantity: {props.quantity}</span>
      </div>
    </div>
  );
};
export default Card;
