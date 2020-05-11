import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// synchronous action creators
export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

// asynchronous action creators makes a request to server
export const purchaseBurgerStart = (orderData) => (dispatch) =>
  axios
    .post("/orders.json", orderData)
    .then((res) => {
      console.log(res.data);
      dispatch(purchaseBurgerSuccess(res.data, orderData));
    })
    .catch((err) => {
      dispatch(purchaseBurgerFail(err));
    });
