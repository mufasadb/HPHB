const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const setup = require("./setupBoard");
const choices =require("./choiceHandler");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const board = setup.board();
const players = setup.players();
const hogwartsCards = setup.hogwartsCards();

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

app.post('/playcard', function (req, res) {
    
    console.log(req.body);
  });

app.get('/choices', function (req, res) {
    choices.decisions(req.headers.UID)
});
const port = process.env.PORT || 6000;
app.listen(port, () => `Server running on port ${port}`);