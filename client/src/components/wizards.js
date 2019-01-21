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
        let activePlayer = "";
        if (this.props.activePlayer){
            activePlayer = this.props.activePlayer
        };

        // let handObj = "";
        if (this.props.wizards) {
            wizardObj = this.props.wizards.map((wizard, i) => <div key={i} >{wizard.character}
                has {wizard.health} health, {wizard.gold} gold, {wizard.lightning}
                lightning, and has {wizard.discardPile.length} discarded cards
        <Hand playing={this.props.playing} hand={wizard.hand} activePlayer={this.props.activePlayer} currentPlayer={wizard.number}/>
            </div>)
        }
        return (
            <div className="wizardContainer">
                <div className="oneWizard">
                    {wizardObj}
                </div>
                <div className="playerNotification">
                    Alright, {activePlayer} it's your turn!
                </div>
            </div>
        );
    }
}
export default Wizards;