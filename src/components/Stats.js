import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { saveSelectedDates } from "../actions/statsActions";
import { Button, ButtonGroup, Badge } from 'react-bootstrap';

// https://rakeemthomas.com/React-Updating-State-from-Child-Components/

class Stats extends Component {
	
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.reduxPlayerSelected !== nextProps.reduxPlayerSelected) {
    //         this.props.fetchStats(nextProps.reduxPlayerSelected);  
    //         console.log(nextProps.reduxPlayerSelected)
    //     }  
    // }
     
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
						
						<img src={this.props.stats.PhotoUrl} alt="Avatar" />
						<div className="container">
						<h4><b>{this.props.stats.LastName} {this.props.stats.FirstName && this.props.stats.FirstName.slice(0,1).toUpperCase()}</b></h4> 
						<p># {this.props.stats.Jersey} Pos:{this.props.stats.Position}</p> 
						</div>
					</div>
				</div>
				<div id="Info">
					<p>
						<strong>Games:</strong>
						<span>{this.props.stats.Games}</span>
					</p>
					<p>
						<strong>AtBats:</strong>
						<span>{this.props.stats.AtBats}</span>
					</p>
					<p>
						<strong>OnBasePercentage:</strong>
						<span>{this.props.stats.OnBasePercentage}</span>
					</p>
					<p>
						<strong>Hits:</strong>
						<span>{this.props.stats.Hits}</span>
					</p>
					<p>
						<strong>Doubles:</strong>
						<span>{this.props.stats.Doubles}</span>
					</p>
					<p>
						<strong>HomeRuns:</strong>
						<span>{this.props.stats.HomeRuns}</span>
					</p>
				</div>

				
				<div></div>
			</div>        
        );
    }
}

Stats.propTypes = {
    // stats: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	stats: state.stats.items,
});

export default connect(mapStateToProps, null)(Stats);
