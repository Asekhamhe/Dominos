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

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("localId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

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
      const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem("token", idToken);
      localStorage.setItem("expirationTime", expirationTime);
      localStorage.setItem("localId", localId);
      dispatch(authSuccess(idToken, localId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error));
    });
};

// redirect
export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logOut());
  } else {
    const expirationTime = new Date(localStorage.getItem("expirationTime"));
    const userId = localStorage.getItem("localId");
    if (expirationTime > new Date()) {
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(expirationTime.getSeconds() - new Date().getSeconds())
      );
    } else {
      dispatch(logOut());
    }
  }
};
