

class Teams {
    
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

}

module.exports = Teams;
