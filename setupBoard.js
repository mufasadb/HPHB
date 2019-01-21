//grab files from constants configs

const hogwartsCards = require('./hogwartsCardDecleration.json');
const locationCards = require('./locationDecleration.json');
const eventCards = require('./eventDecleration.json');
const cardHandler = require('./cardHandler.js');

function cardCopier(variable) {
    let results = JSON.parse(JSON.stringify(variable));
    return results
}

//Player Setup
function playerCardSetup(character) {
    let deck = [];
    for (i = 0; i < 8; i++) {
        deck.push(cardCopier(hogwartsCards.card1));
    };
    switch (character) {
        case "Ron":
            deck.push(cardCopier(hogwartsCards.card3));
            deck.push(hogwartsCards.card3);
            break;
        case "Harry":
            deck.push(cardCopier(hogwartsCards.card2));
            deck.push(cardCopier(hogwartsCards.card2));
            break;
        case "Hermoine":
            break;
        case "Neville":
            break;
        case "Luna":
            break;
    }
    return deck
};

//player creator
function playerCreator(number, character, game) {
    this.number = number;
    this.health = 10;
    this.character = character;
    this.discardPile = [];
    this.lightning = 0;
    this.playedCards = [];
    this.gold = 8;
    this.deck = playerCardSetup(character);
    this.hand = [];
    this.deck = cardHandler.shuffleDeck(this.deck);
    let results = cardHandler.playerDraw(this.deck, this.hand, this.discardPile, 5);
    this.hand = results[0];
    this.deck = results[1];
}

//create players
const players = [new playerCreator(1, "Ron", 0), new playerCreator(1, "Harry", 0)]


//hogwarts deck creator
function hogwartsCreator(game) {
    const cards = Object.keys(hogwartsCards).map(function (_) { return hogwartsCards[_]; })
    let results = []
    for (card in cards) {
        if (cards[card].cardFamily === game) {
            results.push(cardCopier(cards[card]))
        }
    }
    faceDownCards = cardHandler.shuffleDeck(results)
    let faceUpCards = []
    for (let i = 0; i < 5; i++) {
        if (results[0]) {
            faceUpCards.push(results[0])
            results.splice(0, 1)
        }
    }
    let deckCount = results.length
    return {faceUpCards:faceUpCards, deckCount: deckCount, faceDownCards: faceDownCards}
}

//game number
let gameNumber = 1
//player Cap
let playerCap = 2
//make hogwarts deck
let hogwartsDeck = hogwartsCreator(gameNumber);



//event deck creator
function eventDeckCreator(game) {
    let deck = []
    deck.push(eventCards.card1)
    deck.push(eventCards.card2)
    return deck
};

//create even deck
const eventDeck = new eventDeckCreator(0);

//create board
const boardState = {
    villians: [],
    eventDeck: eventDeck,
    location: locationCards.location1,
    locationCount: 1,
    locationLimit: 3,
    activePlayer: 0
};

module.exports = {
    board: function () {
        return boardState
    },
    players: function () {
        return players
    },
    hogwartsCards: function () {
        return hogwartsDeck
    },
    playerCap: function () {
        return playerCap
    }
}