import React, { Component } from 'react';
import { Button, ButtonGroup, Badge } from 'react-bootstrap';

// https://rakeemthomas.com/React-Updating-State-from-Child-Components/

class TeamList extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            records : []
        };    
    }

    componentWillReceiveProps(nextProps) {
        let records = nextProps.teamList;

        // For appac data
        // records = records.team_all_season.queryResults.row.map(team => { return { Key: team.mlb_org_id,  Name: team.name_display_short, WikipediaLogoUrl:'' } });
        
        this.setState({ records });  
    }
     
    // Works in case you need more actions beside onClick, to customize the request
    // handleChange(e) {
    //     const team = e.target.id;
    //     this.props.teamSelect = team;
    // }
    
    render() {
        return (
                <div className="teams">
                    <ButtonGroup vertical>
                        {this.state.records && this.state.records.map(team =>
                            <Button key={team.Key} id={team.Id} name={team.Key} onClick={this.props.teamSelect} >{team.Name} <Badge><img src={team.WikipediaLogoUrl} /></Badge></Button>
                        )}
                    </ButtonGroup>
                </div>        
        );
    }
}
export default TeamList;


