import { FETCH_PLAYERS, SELECT_PLAYER } from "../actions/types";

const initialState = {
   items: [],
   selectedPlayer: undefined, 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_PLAYERS:
            state = {
                ...state,
                items: action.payload
            }
            break;
        case SELECT_PLAYER:
            state = {
                ...state,
                selectedPlayer: action.payload
            }    
        default:
            break;
    }

    return state;
}