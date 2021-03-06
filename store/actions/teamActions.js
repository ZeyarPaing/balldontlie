import { CREATE_TEAM, DELETE_TEAM, UPDATE_TEAM } from "../types";

const isExist = (name, teamState) =>
  teamState.teams.findIndex(
    (team) => team.name.toLowerCase() === name.toLowerCase()
  ) !== -1;

const validateTeam = (team, teamState) => {
  let error = {};
  if (isExist(team.name, teamState)) {
    error.name = "Name already exist, please use another name";
  } else if (!team.name) {
    error.name = "Team name should not be empty";
  }
  if (!team.region) {
    error.region = "Region should not be empty";
  }
  if (!team.country) {
    error.country = "Country should not be empty";
  }
  if (team.playerCount < 1) {
    error.playerCount = "Player count must not less than 1";
  }
  return error;
};

export const createTeam = (team, teamState) => (dispatch) => {
  let error = validateTeam(team, teamState);

  if (!error.name && !error.playerCount && !error.country && !error.region) {
    dispatch({
      type: CREATE_TEAM,
      payload: team,
    });
    return {
      success: true,
      error: {},
    };
  } else {
    return {
      success: false,
      error,
    };
  }
};

export const updateTeam = (updatedTeam, prevTeam, teamState) => (dispatch) => {
  //To omit name duplicate with the updated one and previous one, check with previous value removed state
  let delIdx = teamState.teams.findIndex(
    (team) => team.name.toLowerCase() === prevTeam.name.toLowerCase()
  );
  let newTeamState = { teams: [...teamState.teams] };
  newTeamState.teams.splice(delIdx, 1);

  let error = validateTeam(updatedTeam, newTeamState);

  if (!error.name && !error.playerCount && !error.country && !error.region) {
    dispatch({
      type: UPDATE_TEAM,
      payload: { team: updatedTeam, teamState: newTeamState },
    });
    return {
      success: true,
      error: {},
    };
  } else {
    return {
      success: false,
      error,
    };
  }
};

export const deleteTeam = (teamName) => (dispatch) => {
  dispatch({
    type: DELETE_TEAM,
    payload: teamName,
  });
};

export const addMemberPlayer = (team, player) => (dispatch, getState) => {
  let error = null;
  const teamState = getState().team;

  if (team.playerCount === team.players.length) {
    error = "Player count limit reached!";
  }
  teamState.teams.forEach((t) => {
    let idx = t.players.findIndex((member) => player.id === member.id);
    if (idx !== -1) {
      error =
        t.name === team.name
          ? "Player already joined this team"
          : "Player is already a member of " + t.name;
    }
  });

  if (error) {
    return {
      success: false,
      error,
    };
  }

  let newTeam = { ...team };
  newTeam.players.push(player);
  return dispatch(updateTeam(newTeam, team, teamState));
};
