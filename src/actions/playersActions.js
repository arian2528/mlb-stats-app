import { FETCH_PLAYERS, SELECT_PLAYER } from "./types";
import { API_PLAYER_BOS_DATA } from '../api_data/players/boston.js';
import PlayersClass from '../classes/Players';

const PlayersClassInst = new PlayersClass();

const API_KEY = "bb2f2c280ad949c4bf3f1c4c6a2d86af";
let uri = `https://api.fantasydata.net/v3/mlb/stats/JSON/Players/`;
const myHeaders = new Headers({
    "Ocp-Apim-Subscription-Key" : API_KEY
});

const myInit = {  
    method: 'GET',
    headers: myHeaders,
};

function getAPIData(params) {
    let apiFile;
    switch (params) {
        case 'BOS':
            apiFile = API_PLAYER_BOS_DATA;
            break;
    
        default:
            break;
    }

    return apiFile;
}


export const fetchPlayers = (team) => dispatch => {
    uri = uri + team; console.log(uri)
    const myRequest = new Request(uri, myInit);
    
    // fetch(myRequest)
    // .then(response => {
    //     if (!response.ok) {
    //     throw Error(response.statusText);
    //     }
    //     return response.json()
    // })
    // .then(players => 
    //     players = PlayersClassInst.orderPlayersByExperience(manipulateData(players))
    // )
    // .then(players => 
    //     dispatch({
    //         type: FETCH_PLAYERS,
    //         payload: players,
    //     })  
    // );
    
    const players = PlayersClassInst.orderPlayersByExperience(manipulateData(getAPIData(team)));
    
    dispatch({
        type: FETCH_PLAYERS,
        payload: players,
    });

    function manipulateData(data) {
        return data.map(player =>{
            let positionPitcher = player.Position;
            let disabled = positionPitcher === 'RP' || positionPitcher === 'SP' ? true : false
            return {
              PlayerID: player.PlayerID,
              match: player.FantasyDraftName,
              Jersey: player.Jersey,
              PhotoUrl: player.PhotoUrl,
              FantasyPId: player.PlayerID,
              Name: player.name_full, 
              FirstName: player.FirstName,
              LastName: player.LastName,
              Experience: player.Experience,
              MLBAMID: player.MLBAMID,
              PositionCategory: player.PositionCategory,
              Position: player.Position,
              BatHand: player.BatHand,
              buttonDisabled: disabled,
            } 
        });      
    }
};


export const saveSelectedPlayer = (data) => dispatch => {
    dispatch({
        type: SELECT_PLAYER,
        payload: data,
    });
}