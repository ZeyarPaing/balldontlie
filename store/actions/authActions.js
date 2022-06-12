import * as types from "../types";
// import axios from "axios";

export const login = (username, password) => (dispatch) => {
  // axios.post('/login')
  // Simulate login request
  new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          user: { name: username },
          token: Array.from(password).reverse().join(""),
        }),
      1000
    );
  }).then((res) => {
    dispatch({
      type: types.AUTH_SUCCESS,
      payload: res,
    });
  });
};

export const logout = () => (dispatch) => {
  // axios.post('/logout')
  // Simulate logout request
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000);
  }).then(() => {
    dispatch({
      type: types.LOGOUT,
    });
  });
};
