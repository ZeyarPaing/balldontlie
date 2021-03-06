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
  teams: storedTeams?.teams || [],
};
export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TEAM:
      let teams = [...state.teams, action.payload];
      window.localStorage.setItem(TEAMS_STORE_KEY, JSON.stringify({ teams }));
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
        let newTeam = { teams: teamsClone };
        window.localStorage.setItem(TEAMS_STORE_KEY, JSON.stringify(newTeam));
        return newTeam;
      }
      return state;

    case types.UPDATE_TEAM:
      let updatedTeamState = { ...action.payload.teamState };
      updatedTeamState.teams.push(action.payload.team);

      window.localStorage.setItem(
        TEAMS_STORE_KEY,
        JSON.stringify(updatedTeamState)
      );
      return updatedTeamState;
    default:
      return state;
  }
};
