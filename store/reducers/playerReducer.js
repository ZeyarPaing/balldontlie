import * as types from "../types";
import { PLAYER_FETCH_LIMIT } from "../../src/helper/globalConst";

const initialState = {
  players: [],
  page: 0,
  limit: PLAYER_FETCH_LIMIT,
};

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PLAYERS:
      return {
        ...state,
        page: state.page + 1,
        players: [...state.players, ...action.payload],
      };
    default:
      return state;
  }
};
