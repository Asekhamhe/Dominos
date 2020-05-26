import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => (
        <li key={igKey}>
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {igKey}
          </span>
          : {this.props.ingredients[igKey]}
        </li>
      )
    );
    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>TOTAL PRICE N: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancelOrder} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continueOrder} btnType="Success">
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}

export default OrderSummary;
