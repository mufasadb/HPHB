const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const setup = require("./setupBoard");
const choices = require("./choiceHandler");
const card = require("./cardHandler");
const turnHandler = require("./turnHandler");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var board = setup.board();
var players = setup.players();
var hogwartsCards = setup.hogwartsCards();
var playerCap = setup.playerCap();

app.get('/board', (req, res) => {
    let data = board
    res.json(data);
})
app.get('/players', (req, res) => {
    let data = players
    res.json(data);
})
app.get('/hogwartsCards', (req, res) => {
    let data = hogwartsCards
    res.json(data);
})
app.post('/endTurn', function (req, res) {
    if (board.activePlayer < 0) {
        console.log('starting game')
    } else {
        console.log('ending turn')
    }
    let results = turnHandler.endTurn(board, players, hogwartsCards, playerCap);
    board = results[0];
    players = results[1];
    hogwartsCards = results[2];
})
app.post('/playcard', function (req, res) {
    let error = ""
    if (board.activePlayer < 0) {
        error = "There was no active player"
        console.log("tryied to play a card, but the game hasn't started")
    } else {
        console.log('playing card' + req.body.cardUID)
        let cardUID = req.body.cardUID;
        let actions = req.body.actions
        results = turnHandler.playCard(board, players, cardUID, actions);
        board = results[0]
        players = results[1]
    }
    res.json(error);
});
app.post('/buycard', (req, res) => {
    console.log('buying card with ID: ' + req.body.cardUID)
    results = card.purchaseCard(board, players, hogwartsCards, req.body.cardUID)
    board = results[0]
    players = results[1]
    hogwartsCards = results[2]
});

app.get('/choices', function (req, res) {
    choices.decisions(req.headers.UID)
});
const port = process.env.PORT || 6000;
app.listen(port, () => `Server running on port ${port}`);