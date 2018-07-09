import { FETCH_STATS, SELECT_RANGE_DATES, GRAPH_STATS } from "../actions/types";
import Moment from 'moment';
import 'moment-timezone';


const initialState = {
   items: [],
   dateRangeStart: new Date(),
   dateRangeEnd: new Date(),
   dateRangeStartDefault: new Date(),
   dateRangeEndDefault: new Date(),
   
   graphStats: [],
   daysDateRange: [], 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_STATS:
            state = {
                ...state,
                items: action.payload
            }
            break;
        case SELECT_RANGE_DATES:
            state = {
                ...state,
                dateRangeStart: Moment(action.dateRangeStart).format("YYYY-MM-DD"),
                dateRangeEnd: Moment(action.dateRangeEnd).format("YYYY-MM-DD"),
            }
        break;
        case GRAPH_STATS:
            state = {
                ...state,
                graphStats: action.payload,
                daysDateRange: action.days,
            }
        break;            
        default:
            break;
    }

    return state;
}