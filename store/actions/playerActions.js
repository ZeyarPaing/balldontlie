import * as types from "../types";
import { api } from "../../src/helper/axiosInstance";
import { ADD_PLAYERS } from "../types";

export const fetchPlayers = (page, limit) => (dispatch) => {
  api.get("/players").then((res) => {
    console.log("data   ", res.data);
    dispatch({
      type: ADD_PLAYERS,
      payload: res.data.data,
    });
  });
};
