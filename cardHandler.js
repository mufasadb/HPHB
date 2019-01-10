module.exports = {
    shuffleDeck: function (deck) {
        let deckShuffled = [];
        let ogDeck = JSON.parse(JSON.stringify(deck));
        for (card in deck) {
            let picked = Math.floor(Math.random() * (deck.length - card));
            deckShuffled.push(ogDeck[picked]);
            ogDeck.splice(picked, 1);
        }
        return deckShuffled;
    },
    playerDraw: function (deck, hand, discardPile, drawCount) {

        for (let i = 0; i < drawCount; i++) {
            if (deck.length > 0) {
                hand.push(deck[0]),
                    deck.splice(0, 1);
            } else {
                deck = shuffleDeck(discardPile);
                discardPile.splice(0, discardPile.length)
                hand.push(deck[0]),
                    deck.splice(1, 1);
            }
        }
        // console.log('we have a deck of length', deck.length);
        // console.log('we have a hand of length ', hand.length);
        // console.log('we have a discardPile of length ', discardPile.length);
        return ([deck, hand, discardPile])
    }
}