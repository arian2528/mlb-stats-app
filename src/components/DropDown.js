import React, { Component } from 'react';

const API_KEY = "bb2f2c280ad949c4bf3f1c4c6a2d86af";

class DropDown extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            records : []
        };
        
    }
    
    fetchRecords(service) {
        
        const uri = `https://api.fantasydata.net/v3/mlb/stats/JSON/teams`;
        const myHeaders = new Headers({
          "Ocp-Apim-Subscription-Key" : API_KEY
        });
        
        const myInit = {  method: 'GET',
                          headers: myHeaders,
                       };
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const myRequest = new Request(uri, myInit);
        
        fetch(myRequest)
        .then(response =>{
            return response.json()
        })
        .then(data => { console.log(data)
            const records = data;
            this.setState({ records });
        })
                
        
    }
    componentDidMount() {
        this.fetchRecords()
    }
        
    handleChange(e) {
        const teamSelected = e.target.value;
        this.props.selectedTeam(teamSelected);
        console.log(teamSelected)
    }
    render() {
        return (
            <div className="select">
                <select onChange={this.handleChange.bind(this)}>
                    <option key="0">Please select</option>
                    {this.state.records.map(record =>
                        <option value={record.TeamID} key={record.TeamID}>{record.Name}</option>
                    )}
                </select>
            </div>
        );
    }
}
export default DropDown;