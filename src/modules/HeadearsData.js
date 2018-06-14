const API_KEY = "bb2f2c280ad949c4bf3f1c4c6a2d86af";
const BASE_DOMAIN = `https://api.fantasydata.net/v3/mlb/stats/JSON`;
const APPAC_HOST = `http://lookup-service-prod.mlb.com/json`; 

function getRequestHeaders(service, api) {
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    let uri, myInit
  
    if(api === 'appac'){
      // For appac data
      uri = APPAC_HOST + service;
      myInit = {method: 'GET',};
    }
  
    if(api === 'fantasy'){
      uri = BASE_DOMAIN + service;
      const myHeaders = new Headers({
        "Ocp-Apim-Subscription-Key" : API_KEY
      });
      myInit = { method: 'GET', headers: myHeaders, };
    }
  
    return new Request(uri, myInit);
}

function getService(request,state) {
    
    let serviceAppac, serviceName, serviceFantasy;
    
    switch (request) {
      case 'teams-list':
        serviceFantasy = '/teams'; // https://developer.fantasydata.com
        serviceAppac = `/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season=${state.season}`; // https://appac.github.io/mlb-data-api-docs
        serviceName = 'teams';
        break;
  
      case 'players-list':
        serviceFantasy = `/Players/${state.teamSelectedFantasy}`;
        serviceAppac = `/named.roster_40.bam?team_id=${state.teamSelected}`
        serviceName = 'players';
        break;
      
      case 'player-stats':
        serviceFantasy = `/PlayerSeasonStatsByPlayer/${state.season}/${state.playerid}`;
        serviceAppac = `named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='${state.playerid}'`,
        serviceName = 'player-stats';
        break; 
        
      case 'player-graph-stats':
        serviceFantasy = '';  
        serviceAppac = '';
        serviceName = request;
      default:
        break;
    }
  
    return {
      serviceName: serviceName,
      appac: serviceAppac,
      fantasy: serviceFantasy 
    }; 
  };

module.exports.getHeaders = getRequestHeaders;
module.exports.getService = getService;