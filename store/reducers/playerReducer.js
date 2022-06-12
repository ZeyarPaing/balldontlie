import * as types from "../types";
import { PLAYER_FETCH_LIMIT } from "../../src/helper/globalConst";

const initialState = {
  players: [],
  page: 0,
  canLoadMore: true,
};
export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PLAYERS:
      const { players, total } = action.payload;
      return {
        ...state,
        page: state.page + 1,
        canLoadMore: state.players.length < total,
        players: [...state.players, ...players],
      };
    default:
      return state;
  }
};
