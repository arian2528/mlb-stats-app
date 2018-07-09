import { FETCH_TEAMS, SELECT_TEAM } from "../actions/types";

const initialState = {
   items: [],
   selectedTeam: 'BOS', 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_TEAMS:
            state = {
                ...state,
                items: action.payload
            }
            break;
        case SELECT_TEAM:
            state = {
                ...state,
                selectedTeam: action.payload
            }
            break;

        default:
            break;
    }

    return state;
}