import React, { Component } from 'react';

class HogwartsCards extends Component {
    constructor() {
        super();
        this.state = {
            selectedCard: ""
        }
    }  
    selectCard(key) {
        this.setState = {selectedCard: key}
    }
    render() {
        let theObject = ""
        if(this.props.hogwartsCards){
        theObject = this.props.hogwartsCards.faceUpCards.map((card) => <div className="card" onClick={() => this.props.buyCard(card)} key={card.name}> {card.name}<br/>{card.value}</div>)
        }return (
            <div>
                <div className="hogwartCardsContainer">
                    The hogwarts cards are
                {theObject}
                </div>
            </div>
        )
    };
}

export default HogwartsCards;