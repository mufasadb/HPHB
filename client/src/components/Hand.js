
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
        console.log('well this happened')
    }
    cardClass(UID) {
        let results = "card"
        if (UID === this.state.currentSelection) {
            results = "activeCard"
        }
        return results
    }

    render() {
        return (
            <div className="">
                and has the following cards
                <div className="wizardHand"> {this.props.hand.map((card) =>
                    <div className={this.cardClass(card.cardType)}
                        onClick={() => this.props.playing(card)} key={card.index}> {card.name}
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Hand;