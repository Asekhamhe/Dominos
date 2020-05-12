import React, { Component } from "react";
import axios from "../../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../Order/Order";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      // console.log(this.props.orders);
      orders = this.props.orders.map((order, index) => (
        <Order
          key={index}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
