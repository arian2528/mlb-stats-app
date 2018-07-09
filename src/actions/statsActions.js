import { FETCH_STATS, SELECT_RANGE_DATES, GRAPH_STATS } from "./types";
import { API_STATS_DATA } from "../api_data/stats/player1";
import { API_GRAPH_STATS_DATA } from "../api_data/graphData/playStats";
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const API_KEY = "bb2f2c280ad949c4bf3f1c4c6a2d86af";
let uri = `https://api.fantasydata.net/v3/mlb/stats/JSON/PlayerSeasonStatsByPlayer/2017/`;
const myHeaders = new Headers({
    "Ocp-Apim-Subscription-Key" : API_KEY
});

const myInit = {  
    method: 'GET',
    headers: myHeaders,
};

export const fetchStats = (player) => {

    return (dispatch, getState) => {
        uri = uri + player;
        const myRequest = new Request(uri, myInit);
        // For reading the store in the actions
        // https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers
        const store = getState()

        // fetch(myRequest)
        // .then(response => {
        //     if (!response.ok) {
        //     throw Error(response.statusText);
        //     }
        //     return response.json()
        // })
        // .then(stats => 
        //     stats = manipulateData(stats,player,store.players.items)
        // )
        // .then(stats => {
        //     dispatch({
        //         type: FETCH_STATS,
        //         payload: stats,
        //     }) 
        // }   
        // );

        const stats = manipulateData(API_STATS_DATA,player,store.players.items);
        dispatch({
            type: FETCH_STATS,
            payload: stats,
        });
    }

    function manipulateData(player, playerId, players) {
        const playerInfo = players.find(x => x.PlayerID == playerId);
          
        return {
          PlayerID: playerInfo.PlayerID,
          match: playerInfo.FantasyDraftName,
          Jersey: playerInfo.Jersey,
          PhotoUrl: playerInfo.PhotoUrl,
          FantasyPId: playerInfo.PlayerID,
          Name: playerInfo.name_full, 
          FirstName: playerInfo.FirstName,
          LastName: playerInfo.LastName,
          Experience: playerInfo.Experience,
          MLBAMID: playerInfo.MLBAMID,
          Games: player.Games,
          AtBats: player.AtBats,
          Doubles: player.Doubles,
          Hits: player.Hits,
          HomeRuns: player.HomeRuns,
          OnBasePercentage: player.OnBasePercentage,
          PositionCategory: playerInfo.PositionCategory,
          Position: playerInfo.Position,
          BatHand: playerInfo.BatHand,
          buttonDisabled: playerInfo.disabled,
        }      
    }

    
};

export const saveSelectedDates = (data) => dispatch => {
    dispatch({
        type: SELECT_RANGE_DATES,
        dateRangeStart: data.startDate._d,
        dateRangeEnd: data.endDate._d,
    });
}

export const fetchGraphStats = () => {
    return (dispatch, getState) => {
        
        const store = getState();
        // Get Date range
        let dateRange = getDateRange(store);

        dateRange = dateRange.map( day => Moment(day).format("YYYY-MMM-DD") );

        // Get the promises after fetch
        // const combinedFetch = getStatsGraphPromises(dateRange,store);

        // Promise.all(combinedFetch)
        // .then(data => { 
        //     data = manipulateGraphData(data);
        //     dispatch({
        //         type: GRAPH_STATS,
        //         payload: data,
        //         days: dateRange,
        //     })
        // })
        // .catch(function(error) {
        //     console.log('Looks like there was a problem: \n', error);
        // });

        
        // For testing 
        let data = API_GRAPH_STATS_DATA

        data = manipulateGraphData(data);
        dispatch({
            type: GRAPH_STATS,
            payload: data,
            days: dateRange,
        })
    }

    function manipulateGraphData(data) {
        let dayStats;
        return data.map(stats => {
            dayStats = stats['0'];
            return {
                Day: Moment(dayStats.Day).format("YYYY-MMM-DD"),
                AtBat: dayStats.AtBats ? dayStats.AtBats : 0,
                Hits: dayStats.Hits ? dayStats.Hits : 0,
                Runs: dayStats.Runs ? dayStats.Runs : 0,
            }
        })
    }
    
    function getDateRange(store) {
        // https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        // https://momentjs.com/
        const moment = extendMoment(Moment);
        const range = moment.range(store.stats.dateRangeStart, store.stats.dateRangeEnd)
        return Array.from(range.by('days'))
    }

    function getStatsGraphPromises(dateRange,store) {
        let uriGraphStats, myRequest;
        return dateRange.map(date => {
          date = Moment(date).format("YYYY-MMM-DD");  
          uriGraphStats = `https://api.fantasydata.net/v3/mlb/stats/JSON/PlayerGameStatsByPlayer/${date}/${store.players.selectedPlayer}`;
          myRequest = new Request(uriGraphStats, myInit);
          return fetch(myRequest)
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json()
          }); 
        });
    }
};


