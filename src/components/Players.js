import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveSelectedPlayer } from "../actions/playersActions";
import { fetchStats } from "../actions/statsActions";
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
// import _ from 'lodash';

class Players extends Component {

    constructor(props){
        super(props);
    }   
    saveSelectValue = (e) => {
        let data;
        data = e.target.id
        this.props.saveSelectedPlayer(data)
        this.props.fetchStats(data)
    }
    
    render() {
        return (
                <div className="players">
                    <Grid>
                        <Row>
                            {this.props.players && this.props.players.map(player => 
                                <Col key={player.PlayerID} id={player.PlayerID} xs={4} md={4}>
                                    <Thumbnail src={player.PhotoUrl} alt="242x200">
                                        <h4># {player.Jersey} {player.LastName} {player.FirstName.slice(0,1).toUpperCase()}</h4>
                                        <Button key={player.PlayerID} id={player.PlayerID} name={player.MLBAMID} onClick={(e) => this.saveSelectValue(e)} disabled={player.buttonDisabled}> Stats</Button> Pos: {player.Position}
                                    </Thumbnail>
                                </Col>
                            )}    
                        </Row>
                    </Grid>
                </div>        
        );
    }
}

Players.propTypes = {
    fetchStats: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    saveSelectedPlayer: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    players: state.players.items,
    selectedPlayer: state.players.selectedPlayer,
});

export default connect(mapStateToProps, { saveSelectedPlayer, fetchStats })(Players);