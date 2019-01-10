import React, { Component } from 'react';

class HogwartsCards extends Component {
    constructor() {
        super();
        this.state = {
            hogwartsCards: {
                faceUpCards:[],
                faceDownCount: 0
            },
            selectedCard: "",

        }
    }  
    selectCard(key) {
        this.setState = {selectedCard: key}
    }
    componentDidMount() {
        fetch('/hogwartsCards')
            .then(res => res.json())
            .then(hogwartsCards => this.setState({ hogwartsCards }, () => console.log('data is', hogwartsCards)));
    }
    render() {
        let theObject = this.state.hogwartsCards.faceUpCards.map((card) => <div onClick={() => this.selectCard(card.name)}key={card.name}> {card.name}</div>)
        return (
            <div>
                <div>
                    The hogwarts cards are
                {theObject}
                </div>
            </div>
        )
    };
}

export default HogwartsCards;