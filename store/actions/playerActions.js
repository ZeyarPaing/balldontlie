import { api } from "../../src/helper/axiosInstance";
import { ADD_PLAYERS } from "../types";
import { PLAYER_FETCH_LIMIT } from "../../src/helper/globalConst";

export const fetchPlayers = () => (dispatch, getState) => {
  const { page } = getState().player;
  api
    .get("/players", { params: { page: page, per_page: PLAYER_FETCH_LIMIT } })
    .then((res) => {
      console.log("data    ", res.data);
      dispatch({
        type: ADD_PLAYERS,
        payload: { players: res.data.data, total: res.data.meta.total_count },
      });
    });
  // }, 500);
};
