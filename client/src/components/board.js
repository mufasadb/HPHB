import React, { Component } from 'react';
import VillianBoard from './villianBoard.js';
import EventCards from './eventCards.js';

class Board extends Component {
    constructor() {
        super();
        this.state = {

      }
    };

    render () {
        return (
            <div className="">
                <h3>The Current Location is {this.props.board.location.name}</h3>
                <div>
                    <VillianBoard villianCurrent = {this.props.board.location.villianCurrent} villianCapacity = {this.props.board.location.villianCapacity}/>
                </div>
                <div>
                    <EventCards eventCards = {this.props.board.eventDeck} currentPlayer = {this.props.board.currentPlayer}/>
                </div>
            </div>
        );
    }
}

export default Board;