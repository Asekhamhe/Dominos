import * as actionTypes from "./actionTypes";

export const addIngredient = (payload) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: payload,
});

export const removeIngredient = (payload) => ({
  type: actionTypes.REOMOVE_INGREDIENT,
  ingredientName: payload,
});
