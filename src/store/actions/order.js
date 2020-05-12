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

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

// asynchronous action creators makes a request to server
export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post("/orders.json", orderData)
    .then((res) => {
      console.log(res.data);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    })
    .catch((err) => {
      dispatch(purchaseBurgerFail(err));
    });
};

// synchronous action creators for fetch orders
export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

// asynchronous action creator for fetch orders

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios
    .get("/orders.json")
    .then((res) => {
      const orders = Object.keys(res.data).map((key) => res.data[key]);

      dispatch(fetchOrdersSuccess(orders));
    })
    .catch((err) => {
      dispatch(fetchOrdersFail(err));
    });
};
