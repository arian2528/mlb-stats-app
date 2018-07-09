class Players {
    orderPlayersByExperience(records) {
        // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
        records.forEach( player => {
            player.Experience = player.Experience ? parseInt(player.Experience) : 0;
        });
        // https://stackoverflow.com/questions/28853686/sort-array-by-attribute?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        records.sort((a, b) => parseInt(b.Experience) - parseInt(a.Experience))

        return records;
    }

    getPlayerList(data,api,teamApiMatch) {
        let list = [];
        
        switch (api) {
          case 'appac':
            list = this.getAppacPlayerList(data);
            break;
          
          case 'fantasy':
            list = this.getFantasyPlayerList(data,teamApiMatch);
            list = this.orderPlayersByExperience(list)
            break;  
    
          default:
            break;
        }
    
        return list;
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
}

module.exports = Players;