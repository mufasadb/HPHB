const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const setup = require("./setupBoard");
const choices =require("./choiceHandler");
const card =require("./cardHandler");
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
app.post('/endTurn', function (req, res){
    let results = turnHandler.endTurn(board, players, hogwartsCards, playerCap);
    board = results[0];
    players = results[1];
    hogwartsCards = results[2];
})
app.post('/playcard', function (req, res) {
    console.log(req.body);
    let cardUID = req.body.cardUID;
    let actions = req.body.actions
    results = turnHandler.playCard(board, players, cardUID, actions);
    board = results[0]
    players = results[1] 
    let data = "blah"
    res.json(data);
  });
app.post('/buycard', (req, res) => {
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