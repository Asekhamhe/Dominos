import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (payload) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: payload,
});

export const removeIngredient = (payload) => ({
  type: actionTypes.REOMOVE_INGREDIENT,
  ingredientName: payload,
});

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

// asynchronous action creator
export const initIngredients = () => (dispatch) => {
  axios
    .get("https://react-dominos.firebaseio.com/ingredients.json")
    .then((res) => {
      dispatch(setIngredients(res.data));
    })
    .catch((error) => {
      dispatch(fetchIngredientFailed());
    });
};
