import * as types from "../types";
import { api } from "../../src/helper/axiosInstance";
import { ADD_PLAYERS } from "../types";

let handler = null; //for debounce & prevent double rendering by react strict mode

export const fetchPlayers = (page, limit) => (dispatch) => {
  handler && clearTimeout(handler);
  handler = setTimeout(() => {
    api
      .get("/players", { params: { page: page, per_page: limit } })
      .then((res) => {
        console.log("data    ", res.data);
        dispatch({
          type: ADD_PLAYERS,
          payload: { players: res.data.data, total: res.data.meta.total_count },
        });
      });
  }, 500);
};
