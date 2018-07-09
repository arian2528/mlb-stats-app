import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTeams, saveSelectedTeam } from "../actions/teamActions";
import { fetchPlayers } from "../actions/playersActions";


class Teams extends Component {

    componentWillMount() {
        this.props.fetchTeams();
    }

    saveSelectValue = (e) => {
        let data;
        data = e.target.value
        this.props.saveSelectedTeam(data)
        this.props.fetchPlayers(data)
    }
    render() {
        return (
            <div className="select">
                <select onChange = {(e) => this.saveSelectValue(e)} >
                    <option key="0">Please select</option>
                    {this.props.teams.map(record =>
                        <option value={record.Key} key={record.Key}>{record.Name}</option>
                    )}
                </select>
            </div>
        );
    }
}

Teams.propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    saveSelectedTeam: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    teams: state.teams.items,
    selectedTeam: state.teams.selectedTeam,
});

export default connect(mapStateToProps, { fetchTeams, saveSelectedTeam, fetchPlayers })(Teams);