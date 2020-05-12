import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  return (
    <div className={classes.Order}>
      <p>
        Ingredients: Bacon ({props.ingredients.bacon}), Cheese (
        {props.ingredients.cheese}), Meat ({props.ingredients.meat}), Salad (
        {props.ingredients.salad})
      </p>
      <p>
        Price: <strong>N {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
