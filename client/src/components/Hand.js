
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
    onClickObject(card) {
        if (this.props.activePlayer === this.props.currentPlayer) {
            this.props.playing(card)
        }
    }

    render() {
        let classVariable = "cardInactive";
        if (this.props.activePlayer === this.props.currentPlayer) {
            classVariable = "card"
        }
        return (
            <div className="oneWizard">
                <div className="wizardHand"> {this.props.hand.map((card, index) =>
                    <div key={index} className={classVariable} onClick={() => this.onClickObject(card)}>
                        <h3>{card.name}</h3><br/>{card.description}
                    </div>
                )}
                </div>
            </div>
        );
    }
}

export default Hand;