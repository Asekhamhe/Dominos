import React, { Component } from "react";
import axios from "../../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const orders = Object.keys(res.data).map((key) => res.data[key]);

        console.log(orders);
        this.setState({
          loading: false,
          orders,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    return <div>{this.state.orders.map()}</div>;
  }
}

export default withErrorHandler(Orders, axios);
