import React, { Component } from 'react';
import Hand from './Hand'

class Wizards extends Component {
    constructor() {
        super();
        this.state = {
            currentSelection: 0
        };
    }
    render() {
        let wizardObj = "";
        let activePlayerWords = "";
        if (this.props.activePlayer >= 0){
            let activePlayer = this.props.activePlayer + 1
            activePlayerWords = "Alright player " + activePlayer + "it;s your turn"
        };
        // let handObj = "";
        if (this.props.wizards) {
            wizardObj = this.props.wizards.map((wizard, i) => <div key={i} >
            <div>{wizard.character}
            </div>
            <div>
                health: {wizard.health} 
                </div>
                <div>
                    gold: {wizard.gold}
                    </div>
                    <div> lightning: {wizard.lightning} </div>
                    <div> deck: {wizard.deck.length}</div>
                    <div> discard pile: {wizard.discardPile.length}</div>
                    <div> cards played: {wizard.playedCards.length}</div>
        <Hand playing={this.props.playing} hand={wizard.hand} activePlayer={this.props.activePlayer} currentPlayer={i}/>
            </div>)
        }
        return (
            <div className="wizardContainer">
                <div className="">
                    {wizardObj}
                </div>
                <div className="playerNotification">
                    {activePlayerWords}
                </div>
            </div>
        );
    }
}
export default Wizards;