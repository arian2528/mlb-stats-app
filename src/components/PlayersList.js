import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
// import _ from 'lodash';

class PlayersList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            records : [],
            align: {float:'right'},
        };    
    }

    // https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    componentWillReceiveProps(nextProps) {
        this.setState({ records: nextProps.playerList });  
    }
        
    // handleChange(e) {
    //     const playerSelected = e.target.id;
    //     this.props.playerSelect = playerSelected;
    //     console.log(playerSelected)
    // }
    render() {
        return (
                <div className="players">
                    <Grid>
                        <Row>
                            {this.state.records && this.state.records.map(player => 
                                <Col key={player.PlayerID} id={player.PlayerID} xs={6} md={6}>
                                    <Thumbnail src={player.PhotoUrl} alt="242x200">
                                        <h4># {player.Jersey} {player.LastName} {player.FirstName.slice(0,1).toUpperCase()}</h4>
                                        <Button key={player.PlayerID} id={player.PlayerID} name={player.MLBAMID} onClick={this.props.playerSelect} disabled={player.buttonDisabled}> Stats</Button> Pos: {player.Position}
                                    </Thumbnail>
                                </Col>
                            )}    
                        </Row>
                    </Grid>
                </div>        
        );
    }
}
export default PlayersList;

