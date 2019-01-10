import React, { Component } from 'react';
import VillianBoard from './villianBoard.js';
import EventCards from './eventCards.js';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            board : {
                villians: [],
                eventDeck: [],
                location: {
                    name: "",
                    villianCapacity: 0,
                    villianCurrent: 0,
                    locationNumber: 0,
                    family : ""
                    },
                locationCount: 1,
                locationLimit: 3},
                activePlayer: 0
        }
      }
    componentDidMount() {
        fetch('/board')
          .then(res => res.json())
          .then(board => this.setState({board}, () => console.log('The board state is ', board)));
      }
    render () {
        return (
            <div className="">
                <h3>The Current Location is {this.state.board.location.name}</h3>
                <div>
                    <VillianBoard villianCurrent = {this.state.board.location.villianCurrent} villianCapacity = {this.state.board.location.villianCapacity}/>
                </div>
                <div>
                    <EventCards eventCards = {this.state.board.eventDeck} currentPlayer = {this.state.board.currentPlayer}/>
                </div>
            </div>
        );
    }
}

export default Board;