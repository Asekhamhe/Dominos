import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logOut = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

// asynchronous auth state

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logOut());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcM0jO-kU2EUSfEITNVUaVyk7SxCUtmS8";
  if (!isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcM0jO-kU2EUSfEITNVUaVyk7SxCUtmS8";
  }
  Axios.post(url, authData)
    .then((res) => {
      const { idToken, localId, expiresIn } = res.data;
      dispatch(authSuccess(idToken, localId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error));
    });
};
