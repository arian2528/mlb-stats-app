import React, { Component } from 'react';
import { Button, ButtonGroup, Badge } from 'react-bootstrap';

// https://rakeemthomas.com/React-Updating-State-from-Child-Components/

class PlayerStats extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            records : {
				FirstName: 'Jhon',
				LastName: 'Doe',
				PhotoUrl: '',
				Jersey: '',
			}
        };    
    }
	
    componentWillReceiveProps(nextProps) {
        this.setState({ records: nextProps.playerInfo});  
    }
     
    // Works in case you need more actions beside onClick, to customize the request
    // handleChange(e) {
    //     const team = e.target.id;
    //     this.props.teamSelect = team;
    // }
    
    render() {
        return (
			
			<div id="ProfilePage">
				<div id="LeftCol">
					<div className="card">
						
						<img src={this.state.records.PhotoUrl} alt="Avatar" />
						<div className="container">
						<h4><b>{this.state.records.LastName} {this.state.records.FirstName && this.state.records.FirstName.slice(0,1).toUpperCase()}</b></h4> 
						<p># {this.state.records.Jersey} Pos:{this.state.records.Position}</p> 
						</div>
					</div>
				</div>
				<div id="Info">
					<p>
						<strong>Games:</strong>
						<span>{this.state.records.Games}</span>
					</p>
					<p>
						<strong>AtBats:</strong>
						<span>{this.state.records.AtBats}</span>
					</p>
					<p>
						<strong>OnBasePercentage:</strong>
						<span>{this.state.records.OnBasePercentage}</span>
					</p>
					<p>
						<strong>Hits:</strong>
						<span>{this.state.records.Hits}</span>
					</p>
					<p>
						<strong>Doubles:</strong>
						<span>{this.state.records.Doubles}</span>
					</p>
					<p>
						<strong>HomeRuns:</strong>
						<span>{this.state.records.HomeRuns}</span>
					</p>
				</div>

				
				<div></div>
			</div>        
        );
    }
}
export default PlayerStats;
