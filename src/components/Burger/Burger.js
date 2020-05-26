import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import { withRouter } from "react-router-dom";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) =>
      // create an array with the value of the ingredient key
      [...Array(props.ingredients[ingredient])].map((_, index) => (
        <BurgerIngredients key={ingredient + index} type={ingredient} />
      ))
    )
    .reduce(
      (initialValue, currentValue) => initialValue.concat(currentValue),
      []
    );

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
