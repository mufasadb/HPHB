import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Board from './components/board.js';
import Wizards from './components/wizards.js';
import HogwartsCards from './components/hogwartsCards.js';
import ChoiceModal from './components/choiceModal.js';
import Alert from './components/alert.js';
// import Logo from './components/logo';

class App extends Component {
  constructor() {
    super();
    this.state = {
      wizards: [],
      modalActive: false,
      cardChoiceCard: {},
      board: {
        villians: [],
        eventDeck: [],
        location: {
          name: "",
          villianCapacity: 0,
          villianCurrent: 0,
          locationNumber: 0,
          family: ""
        },
        locationCount: 1,
        locationLimit: 3
      },
      alert: {
        show: false,
        text: ""
      },
      hogwartsCards: {
        faceUpCards: [],
        deckCount: 0,
        faceDownCards: []
      }
    }
    this.choiceHandler = this.choiceHandler.bind(this);
    this.buyCard = this.buyCard.bind(this);
  };
  componentDidMount() {
    this.grabdetails()
  };
  playCard(card, actions) {
    fetch('playcard', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        cardUID: card.UID,
        actions: actions
      })
    })
      .then(this.grabdetails())
  }
grabdetails() {
  this.doAlert('loading')
  fetch('/players')
    .then(res => res.json())
    .then(wizards => this.setState({ wizards }, () => console.log("We've got the following wizards ", wizards)));
  fetch('/board')
    .then(res => res.json())
    .then(board => this.setState({ board }, () => console.log('The board state is ', board)));
  fetch('/hogwartsCards')
    .then(res => res.json())
    .then(hogwartsCards => this.setState({ hogwartsCards }, () => console.log("hogwartsCards are ", hogwartsCards)))
    .then(this.cancelAlert());
}
makeChoice(card) {
  this.setState({ cardChoiceCard: card })
  this.doAlert('true')
}
setModal(state) {
  this.setState({ modalActive: state })
}
choiceHandler(card) {
  if (card.decisions) {
    var action = 0
    if (card.decisions.exist) {
      this.makeChoice(card)
    } else { this.playCard(card, action) }
  }
}
sendCardPurchase(card) {
  fetch('buycard', {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      cardUID: card.UID
    })
  })
    .then(this.grabdetails())
}
doAlert(text){
  this.setState({
    alert: {
      show: true,
      text: text
    }
  })
}
buyCard(card) {
  if (this.state.wizards[this.state.board.activePlayer].gold >= card.value) {
    this.sendCardPurchase(card);
  } else {
    let alert = "you can't buy " + card.name + " because you only have " + this.state.wizards[this.state.board.activePlayer].gold + " gold and " + card.name + " would cost " + card.value + " to purchase."
    this.doAlert(alert)
  }
}
cancelAlert() {
  this.setState({
    alert: {
      show: false,
      text: ""
    }
  })
}
endTurn() {
  fetch('endTurn', {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      activePlayer: this.state.board.activePlayer
    })
  })
    .then(this.grabdetails())
}
render() {
  let endButtonWords = "";
  if (this.state.board.activePlayer === -1) {
    endButtonWords = "Press to start the game";
  } else {
    let playerVal = this.state.board.activePlayer + 1
    endButtonWords = "End " + playerVal + "'s turn";
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title"> HPHB</h1>
        <Alert alert={this.state.alert} cancel={this.cancelAlert.bind(this)} />
        <div className="game">
          <Board board={this.state.board} />
          <Wizards playing={this.choiceHandler} wizards={this.state.wizards} activePlayer={this.state.board.activePlayer} doAlert={this.doAlert.bind(this)} />
          <HogwartsCards buyCard={this.buyCard} hogwartsCards={this.state.hogwartsCards} />
          <ChoiceModal card={this.state.cardChoiceCard} unModal={this.setModal} showHideModal={this.state.modalActive} play={this.choiceHandler.bind(this)} />
          <div className="endTurnContainer">
            <button className="button" onClick={() => this.endTurn()}> {endButtonWords}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
}

export default App;