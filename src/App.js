import React, { Component } from 'react';
import './App.css';

// Loading components
import Titles from "./components/Titles";
// import TeamsCarousel from './components/TeamsCarousel';
// import SearchTeam from './components/SearchTeam';
import TeamList from './components/TeamList';
import PlayersList from "./components/PlayersList";
import PlayerStats from "./components/PlayerStats";
import PlayerStatsGraph from "./components/PlayerStatsGraph";
import DatePicker from "./components/DatePicker";

// Loading dependencies
// import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

// Loading classes
import Players from './classes/Players';
import Teams from "./classes/Teams";

// Loading modules
const HeaderData = require('./modules/HeadearsData.js')
const MatchApi = require('./modules/MatchApis.js');

// Instantiating the class
const Player = new Players();
const Team = new Teams();

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

  getGraphRecords = async () => {
    // Get Date range
    const dateRange = this.getDateRange();
    // Get the promises after fetch
    const combinedFetch = this.getStatsGraphPromises(dateRange);

    Promise.all(combinedFetch)
    .then(data => { 
      let records = data; console.log(records)
      // manipulate data
    })
    .then( data => { 
      // display data
    })
    .catch(function(error) {
      console.log('Looks like there was a problem: \n', error);
    });
  }

  getDateRange() {
    // https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    // https://momentjs.com/
    const moment = extendMoment(Moment);
    const range = moment.range(this.state.startDateRange, this.state.endDateRange)
    return Array.from(range.by('days'))
  }

  getStatsGraphPromises(dateRange) {
    let service, myRequest;
    return dateRange.map(date => {
      date = Moment(date).format("YYYY-MMM-DD");  
      service = `/PlayerGameStatsByPlayer/${date}/${this.state.playerid}`;
      myRequest = HeaderData.getHeaders(service,'fantasy');
      return fetch(myRequest)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      }); 
    });
  }

  getPromises(services, request) {
    let myRequest;
    return API_USED.map(api => {
      if((request !== 'player-stats' && api.status === 1) || (request === 'player-stats' && api.playerStats === 1)){
        myRequest = HeaderData.getHeaders(services[api.name], api.name)
        return fetch(myRequest)
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json()
        });
      }
    });
  }

  getRecords = async (request) => {
    // Get the values of the query for the url to the endpoint
    const services = HeaderData.getService(request,this.state);
    // Get the fetch promises
    const combinedFetch = this.getPromises(services,request);
    // https://medium.com/@wisecobbler/using-the-javascript-fetch-api-f92c756340f0
    Promise.all(combinedFetch)
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
    const teamApiMatch = MatchApi.apiMatch;
    switch (serviceName) {
      case 'teams':
        list = Team.getTeamList(data,api,teamApiMatch);
        if(api === 'appac') this.setState({appacTeamList: list})
        if(api === 'fantasy') this.setState({fantasyTeamList: list})
        break;
  
      case 'players':
        list = Player.getPlayerList(data,api,teamApiMatch);
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
  
      default:
        break;
    }
  
    return list;
  }

  mergeList = async (request) => {
    const services = HeaderData.getService(request,this.state);
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
      this.getGraphRecords()
    }.bind(this))
  }

  showComponent() {
    return false;
  }

  render() {
    return (
      <Provider store={store}>
      
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="">
                <div className="col-xs-6">
                  <div className=""><Titles /></div>
                  <br/>
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
                   {/* this.showComponent() &&  */  // If statement inline
                  <PlayerStatsGraph playerStatsGraph={this.state.playerStatsGraph} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>  
      </Provider>  
    );
  }
}

export default App;
