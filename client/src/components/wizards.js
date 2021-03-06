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
            wizardObj = this.props.wizards.map((wizard, i) => <div key={i} >{wizard.character}
                has {wizard.health} health, {wizard.gold} gold, {wizard.lightning}
                lightning, and has {wizard.discardPile.length} discarded cards
                as well as {wizard.deck.length} cards in their deck
        <Hand playing={this.props.playing} hand={wizard.hand} activePlayer={this.props.activePlayer} currentPlayer={i} doAlert={this.props.doAlert.bind(this)}/>
            </div>)
        }
        return (
            <div className="wizardContainer">
                <div className="oneWizard">
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