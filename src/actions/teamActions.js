import { FETCH_TEAMS, SELECT_TEAM } from "./types";
import { API_TEAMS_DATA } from "../api_data/teams";

const API_KEY = "bb2f2c280ad949c4bf3f1c4c6a2d86af";
const uri = `https://api.fantasydata.net/v3/mlb/stats/JSON/teams`;
const myHeaders = new Headers({
    "Ocp-Apim-Subscription-Key" : API_KEY
});

const myInit = {  
    method: 'GET',
    headers: myHeaders,
};

export const fetchTeams = () => dispatch => {
    
    
    // To prevent fetch the API
    // const myRequest = new Request(uri, myInit);
    // fetch(myRequest)
    // .then(response => {
    //     if (!response.ok) {
    //     throw Error(response.statusText);
    //     }
    //     return response.json()
    // })
    // .then(teams => 
    //     teams = manipulateData(teams)
    // )
    // .then(teams => 
    //     dispatch({
    //         type: FETCH_TEAMS,
    //         payload: teams,
    //     })
    // );

    // Working with local file and json doc
    const teams = manipulateData(API_TEAMS_DATA);

    dispatch({
        type: FETCH_TEAMS,
        payload: teams,
    });

    function manipulateData(teams) {
        return teams.map(team =>{ 
            return {
                Key: team.Key,  
                WikipediaLogoUrl: team.WikipediaLogoUrl,
                Name: team.Name,
                Id : team.TeamID,
            } 
        });
    }
};



export const saveSelectedTeam = (data) => dispatch => {
    dispatch({
        type: SELECT_TEAM,
        payload: data,
    });
}
