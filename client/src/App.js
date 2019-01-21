import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Board from './components/board.js';
import Wizards from './components/wizards.js';
import HogwartsCards from './components/hogwartsCards.js';
import ChoiceModal from './components/choiceModal.js';
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
      activePlayer: 0,
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
  }
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
  }
  grabdetails() {
    fetch('/players')
      .then(res => res.json())
      .then(wizards => this.setState({ wizards }, () => console.log("We've got the following wizards ", wizards)));
    fetch('/board')
      .then(res => res.json())
      .then(board => this.setState({ board }, () => console.log('The board state is ', board)));
    fetch('/hogwartsCards')
      .then(res => res.json())
      .then(console.log("we did it reddit"))
      .then(hogwartsCards => this.setState({ hogwartsCards }, () => console.log("hogwartsCards are ", hogwartsCards)));
  }
  makeChoice(card) {
    this.setModal(true)
    this.setState({ cardChoiceCard: card })
  }
  setModal(state) {
    this.setState({ modalActive: state })
  }
  choiceHandler(card) {
    if (card.decisions) {
      var action = 0
      if (card.decisions.exists) {
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
      .then(console.log('bout to grab'))
      .then(this.grabdetails())
  }

  buyCard(card) {
    if (this.state.wizards[this.state.activePlayer].gold >= card.value) {
      this.sendCardPurchase(card);
    } else {
      console.log('not')
      let newText = "you can't buy " + card.name + " because you only have " + this.state.wizards[this.state.activePlayer].gold
      this.setState({
        alert: {
          show: true,
          text: newText
        }
      })
    }
  }
  onCancel() {
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
        activePlayer: this.state.activePlayer
      })
    })
      .then(this.grabdetails())
  }
  render() {
    let alertObj = "";
    let endButtonWords = "";
    if (this.state.board.activePlayer === 0) {
      endButtonWords = "Press to start the game";
    } else {
      endButtonWords = "End " + this.state.board.activePlayer + "'s turn";
    }
    if (this.state.alert.show) {
      alertObj = <div className='delete-button' onClick={() => { if (window.confirm('Yo, dis too many dolla')) this.onCancel() }} />
    }
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title"> HPHB</h1>
          <div className="game">
            <Board board={this.state.board} />
            <Wizards playing={this.choiceHandler} wizards={this.state.wizards} activePlayer={this.state.board.activePlayer} />
            <HogwartsCards buyCard={this.buyCard} hogwartsCards={this.state.hogwartsCards} />
            <ChoiceModal card={this.state.cardChoiceCard} unModal={this.setModal} play={this.choiceHandler.bind(this)} />
            {alertObj}
            <div >
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