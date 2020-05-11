import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 100,
  cheese: 300,
  meat: 500,
  bacon: 200,
};

const initialState = {
  ingredients: null,
  totalPrice: 200,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };

    case actionTypes.REOMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        error: false,
        ingredients: action.ingredients,
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
