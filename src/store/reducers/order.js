import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [
          ...state.orders,
          {
            ...action.orderData,
            id: action.orderId,
          },
        ],
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
