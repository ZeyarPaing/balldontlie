import * as types from "../types";
import { AUTH_STORE_KEY } from "../../src/helper/globalConst";

let storedState;
if (typeof window != "undefined") {
  storedState = JSON.parse(window.localStorage.getItem(AUTH_STORE_KEY));
}

const initialState = storedState || {
  authenticated: false,
  user: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      const newState = {
        ...state,
        ...action.payload,
        authenticated: true,
      };
      window.localStorage.setItem(AUTH_STORE_KEY, JSON.stringify(newState));
      return newState;
    case types.LOGOUT:
      window.localStorage.removeItem(AUTH_STORE_KEY);
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
