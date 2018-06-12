import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Titles from "./components/Titles";
// import DropDown from "./components/DropDown";
// import TeamsCarousel from './components/TeamsCarousel';
// import SearchTeam from './components/SearchTeam';
import TeamList from './components/TeamList';
import PlayersList from "./components/PlayersList";
import PlayerStats from "./components/PlayerStats";
import PlayerStatsGraph from "./components/PlayerStatsGraph";
import DatePicker from "./components/DatePicker";
import _ from 'lodash';

const API_KEY = "bb2f2c280ad949c4bf3f1c4c6a2d86af";
const BASE_DOMAIN = `https://api.fantasydata.net/v3/mlb/stats/JSON`;
const APPAC_HOST = `http://lookup-service-prod.mlb.com/json`;
const API_USED = [{name: 'appac', status: 0, playerStats: 0},{name: 'fantasy', status: 1, playerStats: 1}];

class App extends Component {

  constructor(props){
    super(props);

    this.selectedTeam = this.selectedTeam.bind(this);
    this.selectedPlayer = this.selectedPlayer.bind(this);
  }

  state = {
    teamList: [],
    playerList: [],
    playerStats: [],
    playerStatsGraph: [],
    fantasyTeamList: [],
    appacTeamList: [],
    appacPlayerList: [],
    fantasyPlayerList: [],
    appacPlayerInfo: [],
    fantasyPlayerInfo: [],
    teamSelected: undefined,
    playerSelected: undefined,
    teamSelectedFantasy: undefined,
    teamSelectedAppac: undefined,
    playerid: undefined,
    season: 2017,
    startDateRange: new Date(),
    endDateRange: new Date(),
  };

  componentDidMount() {
    this.getRecords('teams-list')
  }

  // componentWillMount() {
  //   this.fetchRecords('teams-list')
  // }

  getRecords = async (request) => {
    //transform requests into Promises, await all

    // Get the values of the query for the url to the endpoint
    const services = this.getService(request);
    let combinedFetchs = API_USED.map(api => {
      if((request !== 'player-stats' && api.status === 1) || (request === 'player-stats' && api.playerStats === 1)){
        let myRequest = this.getRequestHeaders(services[api.name], api.name)

        return fetch(myRequest)
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json()
        });
      }
    });

    // https://medium.com/@wisecobbler/using-the-javascript-fetch-api-f92c756340f0
    Promise.all(combinedFetchs)
    .then(data => { 
      let records = data; console.log(records)
      let i = 0;
      API_USED.map(api => {
        if((request !== 'player-stats' && api.status === 1) || (request === 'player-stats' && api.playerStats === 1)){ console.log(services.serviceName)
          this.manipulateRawData(services.serviceName, records[i], api.name);
        }
        i++;
      });
    })
    .then( data => { 
      this.mergeList(request)
    })
    .catch(function(error) {
      console.log('Looks like there was a problem: \n', error);
    });
  }

  manipulateRawData(serviceName,data,api) {
    let list = [];
    const teamApiMatch = this.getTeamApiMatch();
    
    switch (serviceName) {
      case 'teams':
        list = this.getTeamList(data,api,teamApiMatch);
        if(api === 'appac') this.setState({appacTeamList: list})
        if(api === 'fantasy') this.setState({fantasyTeamList: list})
        break;
  
      case 'players':
        list = this.getPlayerList(data,api,teamApiMatch);
        if(api === 'appac') this.setState({appacPlayerList: list})
        if(api === 'fantasy') this.setState({fantasyPlayerList: list})
        break;
      //   let playersPhotos = this.getPlayersFantasyList(data,teamApiMatch);
        
      //   // Using this because of data from fantasy has more info
      //   // In case we want the data from appac, comment this and add back the line after  this.getAppacPlayerList()
      //   mergeList = playersPhotos;
      //   mergeList = this.orderPlayersByExperience(mergeList);
        
      //   // mergeList = this.getAppacPlayerList(records,playersPhotos); // disabled for now, not using appac data
      //   break;

      case 'player-stats':
        list = this.getPlayerStats(data,api);
        if(api === 'appac') this.setState({appacPlayerInfo: list})
        if(api === 'fantasy') this.setState({fantasyPlayerInfo : list})
        break;
        
      case 'player-graph-stats':
        list = this.getPlayerStatsGraph(data,api);
        if(api === 'appac') this.setState({appacPlayerInfoGraph: list})
        if(api === 'fantasy') this.setState({fantasyPlayerInfoGraph: list})
        break;   
  
      default:
        break;
    }
  
    return list;
  }

  mergeList = async (request) => {
    const services = this.getService(request);
    const list = this.getMergedList(services.serviceName);
    this.storeRecordsOnState(services.serviceName,list);
  }

  getMergedList(serviceName) {
    let list = [];
    switch (serviceName) {
      case 'teams':
        // Get all team list and merge depending specific req

        // This for now
        list = this.state.fantasyTeamList;
        break;

      case 'players':
        // Get all players list and merge depending specific req

        // This for now
        list = this.state.fantasyPlayerList;
        break;
        
      case 'player-stats':
        // Get all players info and merge depending specific req

        // This for now
        list = this.state.fantasyPlayerInfo;
        break;    
    
      default:
        break;
    }

    return list;
  }


getTeamList(data,api,teamApiMatch) {
  let list = [];
  
  switch (api) {
    case 'appac':
      list = this.getAppacTeamList(data);
      break;
    
    case 'fantasy':
      list = this.getFantasyTeamList(data,teamApiMatch);
      break;  

    default:
      break;
  }

  return list;
}

getPlayerList(data,api,teamApiMatch) {
  let list = [];
  
  switch (api) {
    case 'appac':
      list = this.getAppacPlayerList(data);
      break;
    
    case 'fantasy':
      list = this.getFantasyPlayerList(data,teamApiMatch);
      list = this.orderPlayersByExperience(list);
      break;  

    default:
      break;
  }

  return list;
}

getPlayerStats(data,api) {
  let list = [];
  
  switch (api) {
    case 'appac':
      list = this.getAppacPlayerStats(data);
      break;
    
    case 'fantasy':
      list = this.getFantasyPlayerStats(data);
      break;  

    default:
      break;
  }

  return list;
}

getPlayerStatsGraph(data, api) {
  let list = [];
  
  switch (api) {
    case 'appac':
      list = this.getAppacPlayerStatsGraph(data);
      break;
    
    case 'fantasy':
      list = this.getFantasyPlayerStatsGraph(data);
      break;  

    default:
      break;
  }

  return list;
}

getFantasyPlayerStats(data) { 
  const playerInfo = this.state.playerList.find(x => x.PlayerID == this.state.playerid);
  const player = data;
    
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

getAppacTeamList(records) {

  const fantasyTeamsList = this.state.fantasyTeamList;

  return records.team_all_season.queryResults.row.map(team => { 
    // https://stackoverflow.com/questions/39235353/es6-find-an-object-in-an-array-by-one-of-its-properties?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    // To get the logos of the teams from fantasy api
    let logo = fantasyTeamsList ? fantasyTeamsList.find( x => x.match === team.bis_team_code) : undefined;
    return { 
      Id: team.mlb_org_id,  
      Name: team.name_display_short, 
      WikipediaLogoUrl: logo != undefined ? logo.WikipediaLogoUrl : '',
      Key: team.bis_team_code, 
    } 
  });
}

getFantasyTeamList(fantasyTeams,teamApiMatch) {
  return fantasyTeams.map(team =>{ 
    // To match values with appac api 
    let teamApiMatched = teamApiMatch.find( x => x.Key === team.Key);
    return {
      Key: team.Key,  
      match: teamApiMatched !== undefined ? teamApiMatched.Translate : team.Key,
      WikipediaLogoUrl: team.WikipediaLogoUrl,
      Name: team.Name,
      Id : team.TeamID,
    } 
  });
}

getFantasyPlayerList(data,teamApiMatch) {
  return data.map(player =>{
    // To match values with appac api 
    // let teamApiMatched = teamApiMatch.find( x => x.Key === team.Key);
    let positionPitcher = player.Position;
    let disabled = positionPitcher === 'RP' || positionPitcher === 'SP' ? true : false
    return {
      // Key: teamApiMatched !== undefined ? teamApiMatched.Translate : team.Key,
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























// manipulateData(serviceName, records, serviceFantasy) {

//   let data = [];
//   data = this.getFantasyDataApi(serviceName, records,serviceFantasy);
//   console.log(data)
//   return data;

// }

// getFantasyDataApi = async (serviceName,records,serviceFantasy) => {
  
//   const myRequest = this.getRequestHeaders(serviceFantasy,'fantasy');
//   const teamApiMatch = this.getTeamApiMatch();

//   fetch(myRequest)
//   .then(response =>{
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       return response.json()
//   })
//   .then(data => {
    
//     const mergedList = this.mergeApiResponse(records,data,serviceName);
    
//     // const list = this.mergeApiResponse(records,data);
//     // this.storeRecordsOnState(serviceName,list);
    
//     // const devFantasyTeams = data;
//     // const teamApiMatch = this.getTeamApiMatch();
//     // let teamLogos = this.getTeamLogosList(devFantasyTeams,teamApiMatch);
//     // const AppacTeamList = this.getAppacTeamList(records,teamLogos);
//     // this.setState({teamLogos})
//     // this.storeRecordsOnState(serviceName,AppacTeamList);
//   })
//   .catch(function(error) {
//     console.log('Looks like there was a problem with the fantasy request data: \n', error);
//     this.storeRecordsOnState(serviceName,records);
//   });
// }

// mergeApiResponse = async (records,data,serviceName) => {
//   const list = this.getApiMergeResponse(records,data,serviceName)
//   this.storeRecordsOnState(serviceName,list);
//   return list;
// }

// getApiMergeResponse(records,data,serviceName) {
//   let mergeList = [];
//   const teamApiMatch = this.getTeamApiMatch();
  
//   switch (serviceName) {
//     case 'teams':
//       let fantasyTeamList = this.getFantasyTeamList(data,teamApiMatch);
//       // Using this because of data from fantasy has more info
//       // In case we want the data from appac, comment this and add back the line after  this.getAppacTeamList()
//       mergeList = fantasyTeamList;
      
//       // mergeList = this.getAppacTeamList(records,fantasyTeamList); // disabled for now, not using appac data
//       this.setState({fantasyTeamList})
//       break;

//     case 'players':
//       let playersPhotos = this.getPlayersFantasyList(data,teamApiMatch);
      
//       // Using this because of data from fantasy has more info
//       // In case we want the data from appac, comment this and add back the line after  this.getAppacPlayerList()
//       mergeList = playersPhotos;
//       mergeList = this.orderPlayersByExperience(mergeList);
      
//       // mergeList = this.getAppacPlayerList(records,playersPhotos); // disabled for now, not using appac data
//       break;

//     default:
//       break;
//   }

//   return mergeList;
// }



getAppacPlayerList(records,playersPhotos) {
  return records.roster_40.queryResults.row.map(player => { 
    // https://stackoverflow.com/questions/39235353/es6-find-an-object-in-an-array-by-one-of-its-properties?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    // To get the photos of the players from fantasy api
    let photo = playersPhotos ? playersPhotos.find( x => (x.match === player.name_display_first_last || x.Jersey === player.jersey_number)) : undefined;
    return { 
      Id: player.player_id,  
      Name: player.name_full, 
      FirstName: player.name_first,
      LastName: player.name_last,
      PhotoUrl: photo != undefined ? photo.PhotoUrl : '',
      PlayerID: player.player_id,
      Jersey: player.jersey_number, 
    } 
  });
}

storeRecordsOnState(serviceName,records) {
  switch (serviceName) {
    case 'teams':
      this.setState({ teamList : records });
      break;
    
    case 'players':
      this.setState({ playerList : records });
      break;

    case 'player-stats':
      this.setState({ playerStats : records })  
      break;

    default:
      break;
  }
}

getService(request) {
  
  let serviceAppac, serviceName, serviceFantasy;
  
  switch (request) {
    case 'teams-list':
      serviceFantasy = '/teams'; // https://developer.fantasydata.com
      serviceAppac = `/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season=${this.state.season}`; // https://appac.github.io/mlb-data-api-docs
      serviceName = 'teams';
      break;

    case 'players-list':
      serviceFantasy = `/Players/${this.state.teamSelectedFantasy}`;
      serviceAppac = `/named.roster_40.bam?team_id=${this.state.teamSelected}`
      serviceName = 'players';
      break;
    
    case 'player-stats':
      serviceFantasy = `/PlayerSeasonStatsByPlayer/${this.state.season}/${this.state.playerid}`;
      serviceAppac = `named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='${this.state.playerid}'`,
      serviceName = 'player-stats';
      break;  

    default:
      break;
  }

  return {
    serviceName: serviceName,
    appac: serviceAppac,
    fantasy: serviceFantasy 
  }; 
}

getRequestHeaders(service, api) {
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

getTeamApiMatch() {
  return [
    {
      Key: 'CHW',
      Translate: 'CWS'    
    },
    {
      Key: 'CHC',
      Translate: 'CHI'    
    },
    {
      Key: 'LAA',
      Translate: 'CAL'    
    },
    {
      Key: 'LAD',
      Translate: 'LA'    
    },
    {
      Key: 'MIA',
      Translate: 'FLA'    
    },
    {
      Key: 'NYM',
      Translate: 'NY'    
    },
    {
      Key: 'WSH',
      Translate: 'MON'    
    },
  ];
}

orderPlayersByExperience(records) {
  // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  records.forEach( player => {
    player.Experience = player.Experience ? parseInt(player.Experience) : 0;
  });
  // https://stackoverflow.com/questions/28853686/sort-array-by-attribute?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  records.sort((a, b) => parseInt(b.Experience) - parseInt(a.Experience))

  return records;
}
  
  // getStats = async (e) => {
  //   e.preventDefault();
  //   let firstname = e.target.elements.firstname.value;
  //   let lastname = e.target.elements.lastname.value;
  //   let team = e.target.elements.team.value;
  //   let playerid = 10000022;
  //   const uri = `https://api.fantasydata.net/v3/mlb/stats/JSON/Player/${playerid}`;
  //   const myHeaders = new Headers({
  //     "Ocp-Apim-Subscription-Key" : API_KEY
  //   });
    
  //   const myInit = {  method: 'GET',
  //                     headers: myHeaders,
  //                  };
  //   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	//   const myRequest = new Request(uri, myInit);
  //   const api_call = await fetch(myRequest)
  //   const data = await api_call.json();
  //   console.log(data);
  //   if (firstname && lastname) {
  //     this.setState({
  //       // temperature: data.main.temp,
  //       // city: data.name,
  //       firstname: "Arian", 
  //       lastname: "Buzon",
  //       position: "catcher",
  //       team: "Boston",
  //       country: "Cuba",
  //       error: ""
  //     });
  //   }
  //   // } else {
  //   //   this.setState({
  //   //     temperature: undefined,
  //   //     city: undefined,
  //   //     country: undefined,
  //   //     humidity: undefined,
  //   //     description: undefined,
  //   //     error: "Please enter the values."
  //   //   });
  //   // }
  // }

  selectedTeam = async (e) => {
    e.preventDefault(); 
    // https://stackoverflow.com/questions/38558200/react-setstate-not-updating-immediately?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    this.setState({ teamSelected: e.target.id, teamSelectedFantasy: e.target.name }, function () {
      this.getRecords('players-list')
    }.bind(this));
  }

  selectedPlayer = async (e) => {
    e.preventDefault();
    this.setState({ playerid: e.target.id }, function () {
      this.getRecords('player-stats')
      // console.log(this.state)
    }.bind(this));
  }

  getGraphStats = async (event, picker) => {
    // e.preventDefault();
    this.setState({ startDateRange: picker.startDate._d, endDateRange: picker.endDate._d }, function() {
      this.getRecords('player-graph-stats')
    }.bind(this))
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="">
                <div className="col-xs-6">
                  <div className=""><Titles /></div>
                  <br/>
                  {/* <p><h5>Select team</h5></p> */}
                  {/* <div className="row"><DropDown selectedTeam={this.selectedTeam.bind(this)} /></div> */}
                  {/* <div className="row"><DropDown /></div> */}
                  {/* <div className=""><TeamsCarousel selectedTeam={this.selectedTeam.bind(this)} /></div> */}
                  <div>
                    <div className="col-xs-4">
                      <TeamList teamList={this.state.teamList} teamSelect={this.selectedTeam} />
                    </div>
                    <div className="col-xs-8">
                      <PlayersList playerList={this.state.playerList} playerSelect={this.selectedPlayer} />
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 form-container">
                  <PlayerStats playerInfo={this.state.playerStats} />
                  <div className="col-xs-5 SeasonStatsTitle"><h4>Season stats by date</h4></div>
                  <div className="col-xs-7 datePicker"><DatePicker startDate={this.state.startDateRange} endDate={this.state.endDateRange} dateRange={this.getGraphStats}/></div>
                  <PlayerStatsGraph playerStatsGraph={this.state.playerStatsGraph} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
