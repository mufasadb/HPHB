
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

    render() {
        let classVariable = "";
        if(this.props.activePlayer === this.props.currentPlayer){
            
        }
        return (
          <div className={classVariable}>
                and has the following cards
                <div className="wizardHand"> {this.props.hand.map((card, index) =>
                    <div key={index} className={this.cardClass(card.cardType)}
                        onClick={() => this.props.playing(card)} > {card.name}
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Hand;