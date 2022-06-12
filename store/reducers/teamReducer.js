import * as types from "../types";
import {
  AUTH_STORE_KEY,
  PLAYER_FETCH_LIMIT,
  TEAMS_STORE_KEY,
} from "../../src/helper/globalConst";

let storedTeams;
if (typeof window != "undefined") {
  storedTeams = JSON.parse(window.localStorage.getItem(TEAMS_STORE_KEY));
}
const initialState = {
  teams: storedTeams || [],
};
export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TEAM:
      let teams = [...state.teams, action.payload];
      window.localStorage.setItem(TEAMS_STORE_KEY, JSON.stringify(teams));
      return {
        teams,
      };

    case types.DELETE_TEAM:
      let delIdx = state.teams.findIndex(
        (team) => team.name.toLowerCase() === action.payload.toLowerCase()
      );
      if (delIdx !== -1) {
        let teamsClone = [...state.teams];
        teamsClone.splice(delIdx, 1);
        window.localStorage.setItem(
          TEAMS_STORE_KEY,
          JSON.stringify(teamsClone)
        );
        return {
          teams: teamsClone,
        };
      }
      return state;

    case types.UPDATE_TEAM:
      let updatedTeams = [...action.payload.teamState, ...action.payload.team];
      window.localStorage.setItem(
        TEAMS_STORE_KEY,
        JSON.stringify(updatedTeams)
      );
      return {
        updatedTeams,
      };
    default:
      return state;
  }
};
