import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { playerReducer } from "./playerReducer";
import { teamReducer } from "./teamReducer";

export default combineReducers({
  auth: authReducer,
  player: playerReducer,
  team: teamReducer,
});
