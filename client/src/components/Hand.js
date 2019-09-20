
import React, { Component } from 'react';

class Hand extends Component {
    constructor() {
        super();
        this.state = {
            currentSelection: 0,
            wizard: []
        };
    }
    selectCard(UID) {
        this.setState({ currentSelection: UID })
    }
    cardClass(UID) {
        let results = "card"
        if (UID === this.state.currentSelection) {
            results = "activeCard"
        }
        return results
    }

    playCard(card) {
        if (this.props.activePlayer === this.props.currentPlayer) {
            this.props.playing(card)
        } else (this.props.doAlert("Hey!, that's not your card"))
    }
    render() {
        let classVariable = "";
        if (this.props.activePlayer === this.props.currentPlayer) {
            classVariable = "activeWizard"
        } else { classVariable = "inactiveWizard" }
        let handObject = ""
        if (this.props.hand.length > 0) {
        handObject =  this.props.hand.map((card, index) =>
                <div key={index} className={this.cardClass(card.cardType)}
                    onClick={() => this.playCard(card)} > {card.name}
                </div>)

        }
        return (
            <div className={classVariable}>
                and has the following cards
                <div className="wizardHand">
                    {handObject}
                </div>
            </div>
        );
    }
}

export default Hand;