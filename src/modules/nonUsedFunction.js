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