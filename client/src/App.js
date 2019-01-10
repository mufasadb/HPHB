import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Board from './components/board.js';
import Wizards from './components/wizards.js';
import HogwartsCards from './components/hogwartsCards.js';
import choiceModal from './components/choiceModal.js';
// import Logo from './components/logo';

class App extends Component {
  constructor() {
    super();
    this.state = {
        wizards: [],
        modalActive: false
    };
}
grabdetails() {
    fetch('/players')
        .then(res => res.json())
        .then(wizards => this.setState({ wizards }, () => console.log("We've got the following wizards ", wizards)));
}
makeChoice(card){
  this.setModal(true)
}
setModal(state){
  this.setState({modalActive: state})
}
choiceSelector(card){
  var actions = []
  if(card.decisions.exists){
    actions = this.makeChoice(card)
  } else {
    actions = card.actionObjects
  }
  return actions
}
componentDidMount() {
    this.grabdetails()
}
  playing(card) {
    let actions = this.choiceSelector(card)
    fetch('playcard', {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            cardUID: card.UID,
            actionObject: actions
        })
    })
    this.grabdetails()
}
    render() {
      let decisions = {
        exist: false,
        options: [],
        text: ""
    }
      return (
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title"> HPHB</h1>
            <div className="game">
          <Board/>
          <Wizards playing={this.playing}/>
          <HogwartsCards/>
          <choiceModal choiceOptions = {decisions.options} choiceText = {decisions.text}/>
          </div>
          </header>
  
        </div>
      );
    }
  }
  
  export default App;