import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTeams, saveSelectedTeam } from "../actions/teamActions";
import { fetchPlayers } from "../actions/playersActions";
import Coverflow  from "react-coverflow";
import { StyleRoot } from 'radium';

class TeamsCarousel extends Component {
    
    componentWillMount() {
        this.props.fetchTeams();
    }

    saveSelectValue = (e) => {
        let data;
        data = e.target.id
        this.props.saveSelectedTeam(data)
        this.props.fetchPlayers(data)
    }
    render() {
        return (
            <StyleRoot>
                <Coverflow
                    displayQuantityOfSide={2}
                    
                    infiniteScroll
                    enableHeading
                    media={{
                    '@media (max-width: 900px)': {
                        width: '100%',
                        height: '140px'
                    },
                    '@media (min-width: 900px)': {
                        width: '100%',
                        height: '140px'
                    }
                    }}
                >
                    {this.props.teams.map(record => 
                            <img className='logosImages' src={record.WikipediaLogoUrl} alt={record.Name}  key={record.Key} id={record.Key} height="80" width="30" onClick={(e) => this.saveSelectValue(e)}/>
                    )}
                </Coverflow>
            </StyleRoot>
            
                // <div className="imgs">
                //     {this.state.records.map(record =>
                //         <div className="card">
                //             {/* <img src="" alt="John" style="width:100%"> */}
                //             <img id={record.TeamID} src={record.WikipediaLogoUrl} onClick={this.handleChange.bind(this)}/>
                //             {/* <p className="title"></p> */}
                //             <p id={record.TeamID}>{record.Name}</p>
                            
                //             {/* <p><button>Contact</button></p> */}
                //         </div>
                //     )}
                    
                // </div>
            
        );
    }
}

TeamsCarousel.propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    saveSelectedTeam: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    teams: state.teams.items,
    selectedTeam: state.teams.selectedTeam,
});

export default connect(mapStateToProps, { fetchTeams, saveSelectedTeam, fetchPlayers })(TeamsCarousel);
