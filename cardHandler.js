function shuffle(deck) {
    let deckShuffled = [];
    let ogDeck = JSON.parse(JSON.stringify(deck));
    for (card in deck) {
        let picked = Math.floor(Math.random() * (deck.length - card));
        deckShuffled.push(ogDeck[picked]);
        ogDeck.splice(picked, 1);
    }
    return deckShuffled
}

module.exports = {
    shuffleDeck: function (deck) {
        let deckShuffled = shuffle(deck)
        return deckShuffled;
    },
    playerDraw: function (deck, hand, discardPile, drawCount) {

        for (let i = 0; i < drawCount; i++) {
            if (deck.length > 0) {
                hand.push(deck[0]),
                    deck.splice(0, 1);
            } else {
                deck = shuffle(discardPile);
                hand.push(deck[0]),
                    deck.splice(0, 1);
                discardPile.splice(0, discardPile.length)
            }
        }

        return ([deck, hand, discardPile])
    },
    purchaseCard: function (board, players, hogwartsCards, cardUID) {
        if (hogwartsCards.faceUpCards.findIndex(x => x.UID === cardUID) >= 0) {
            console.log("found the UID")
            let selectedIndex = hogwartsCards.faceUpCards.findIndex(x => x.UID == cardUID);
            let selectedCardPrice = parseInt(hogwartsCards.faceUpCards.find(x => x.UID == cardUID).value);
            players[board.activePlayer].discardPile.push(hogwartsCards.faceUpCards[selectedIndex]);
            hogwartsCards.faceUpCards.splice(selectedIndex, 1);
            players[board.activePlayer].gold = players[board.activePlayer].gold - selectedCardPrice
        }
        return [board, players, hogwartsCards]
    }
}