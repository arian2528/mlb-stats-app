import { combineReducers } from "redux";
import teamReducer from "./teamReducer";
import playersReducer from "./playersReducer";
import statsReducer from "./statsReducer";

export default combineReducers({
    teams: teamReducer,
    players: playersReducer,
    stats: statsReducer,
});