import React, { Component } from 'react';
import './App.css';

// Loading Redux stuffs
// https://www.youtube.com/watch?v=93p3LxR9xfM
// https://github.com/bradtraversy/redux_crash_course/blob/master/src/store.js
import { Provider } from "react-redux";
import store  from "./store";
// https://www.npmjs.com/package/redux-state-save
import Storage from "redux-state-save";

// Loading components
import Titles from "./components/Titles";
// import Teams from "./components/Teams";
import Players from "./components/Players";
import Stats from "./components/Stats";
import TeamsCarousel from './components/TeamsCarousel';
// import SearchTeam from './components/SearchTeam';

import PlayerStats from "./components/PlayerStats";
import PlayerStatsGraph from "./components/PlayerStatsGraph";
// import DatePicker from "./components/DatePicker";
import DateRange from "./components/DateRange";

// Loading dependencies
// import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

// Loading classes
import PlayersClass from './classes/Players';
import TeamsClass from "./classes/Teams";

// Loading modules
const HeaderData = require('./modules/HeadearsData.js')
const MatchApi = require('./modules/MatchApis.js');

// Instantiating the class
const PlayersClassInst = new PlayersClass();
const TeamsClassInst = new TeamsClass();

class ReduxApp extends Component {

  constructor(props){
    super(props);
  }

  // state = {
  //   teamList: [],
  //   playerList: [],
  //   playerStats: [],
  //   playerStatsGraph: [],
  //   teamSelected: undefined,
  //   playerSelected: undefined,
  //   season: 2017,
  //   startDateRange: new Date(),
  //   endDateRange: new Date(),
  // };

  // getGraphRecords = async () => {
  //   // Get Date range
  //   const dateRange = this.getDateRange();
  //   // Get the promises after fetch
  //   const combinedFetch = this.getStatsGraphPromises(dateRange);

  //   Promise.all(combinedFetch)
  //   .then(data => { 
  //     let records = data; console.log(records)
  //     // manipulate data
  //   })
  //   .then( data => { 
  //     // display data
  //   })
  //   .catch(function(error) {
  //     console.log('Looks like there was a problem: \n', error);
  //   });
  // }

  // getDateRange() {
  //   // https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  //   // https://momentjs.com/
  //   const moment = extendMoment(Moment);
  //   const range = moment.range(this.state.startDateRange, this.state.endDateRange)
  //   return Array.from(range.by('days'))
  // }

  // getStatsGraphPromises(dateRange) {
  //   let service, myRequest;
  //   return dateRange.map(date => {
  //     date = Moment(date).format("YYYY-MMM-DD");  
  //     service = `/PlayerGameStatsByPlayer/${date}/${this.state.playerid}`;
  //     myRequest = HeaderData.getHeaders(service,'fantasy');
  //     return fetch(myRequest)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       return response.json()
  //     }); 
  //   });
  // }

  // getGraphStats = async (event, picker) => {
  //   // e.preventDefault();
  //   this.setState({ startDateRange: picker.startDate._d, endDateRange: picker.endDate._d }, function() {
  //     this.getGraphRecords()
  //   }.bind(this))
  // }

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
                    <div className="col-xs-12">
                      {/* <Teams /> */}
                      <TeamsCarousel />
                    </div>
                    <br/>
                    <div className="col-xs-12">
                      <Players />
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 form-container">
                  <Stats />
                  <div className="col-xs-5 SeasonStatsTitle"><h4>Season stats by date</h4></div>
                  <div className="col-xs-7 datePicker"><DateRange /></div>
                   {/* this.showComponent() &&  */  // If statement inline
                  <div className="col-xs-12 PlayerStatsGraph">
                    <PlayerStatsGraph />
                  </div>
                  
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

export default ReduxApp;
