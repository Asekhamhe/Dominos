import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
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

    default:
      return state;
  }
};
