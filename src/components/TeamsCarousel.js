import React, { Component } from 'react';

const API_KEY = "bb2f2c280ad949c4bf3f1c4c6a2d86af";

class TeamsCarousel extends Component {
    
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
        const teamSelected = e.target.id;
        this.props.selectedTeam(teamSelected);
        console.log(teamSelected)
    }
    render() {
        return (
            
                <div className="imgs">
                    {this.state.records.map(record =>
                        <div className="card">
                            {/* <img src="" alt="John" style="width:100%"> */}
                            <img id={record.TeamID} src={record.WikipediaLogoUrl} onClick={this.handleChange.bind(this)}/>
                            {/* <p className="title"></p> */}
                            <p id={record.TeamID}>{record.Name}</p>
                            
                            {/* <p><button>Contact</button></p> */}
                        </div>
                    )}
                    
                </div>
            
        );
    }
}
export default TeamsCarousel;
