const actionHandler = require("./actionHandler");
const cardHandler = require("./cardHandler");
function changeTurns(activePlayer, playerCap) {

    playerCap = playerCap - 1
    if (activePlayer === playerCap) {
        activePlayer = 0
    } else {
        activePlayer = activePlayer + 1
    }
    return activePlayer
}
function refillHoggies(hogwartsCards) {
    while (hogwartsCards.faceUpCards.length < 6) {
        hogwartsCards.faceUpCards.push(hogwartsCards.faceDownCards[0])
        hogwartsCards.faceDownCards.splice(0, 1)
    }
    console.log('filled hoggies')
    return hogwartsCards
}
function cardIndex(board, players, cardUID) {
    var playedCardIndex = players[board.activePlayer].hand.findIndex(card => {
        return card.UID === cardUID
    })
    return playedCardIndex
}
function card(board, players, cardUID) {
    var playedCard = players[board.activePlayer].hand.find(card => {
        return card.UID === cardUID
    })
    return playedCard
}
function drawCards(players, activePlayer) {
    console.log(players[activePlayer].discardPile.map(card => card.name))
    results = cardHandler.playerDraw(players[activePlayer].deck, players[activePlayer].hand, players[activePlayer].discardPile, 5)
    players[activePlayer].deck = results[0]
    players[activePlayer].hand = results[1]
    players[activePlayer].discardPile = results[2]
    console.log(' cards draw')
    return players
}
function turnDiscard(players, activePlayer){
    players[activePlayer].gold = 0
    players[activePlayer].lightning = 0
    while(players[activePlayer].hand.length > 0){
        players[activePlayer].discardPile.push(players[activePlayer].hand[0])
        players[activePlayer].hand.splice(0,1)
    }
    while(players[activePlayer].playedCards.length > 0){
        players[activePlayer].discardPile.push(players[activePlayer].playedCards[0])
        players[activePlayer].playedCards.splice(0,1)
    }
    console.log('cards discarded')
    return players
}
module.exports = {
    endTurn: function (board, players, hogwartsCards, playerCap) {
        if (board.activePlayer >= 0) {
            players =turnDiscard(players, board.activePlayer)
            hogwartsCards = refillHoggies(hogwartsCards)
            players = drawCards(players, board.activePlayer)
        }
        board.activePlayer = changeTurns(board.activePlayer, playerCap)
        return ([board, players, hogwartsCards])
    },
    playCard: function (board, players, cardUID, actions) {
        let activePlayer = players[board.activePlayer]
        playedCard = card(board, players, cardUID)
        playedCardIndex = cardIndex(board, players, cardUID)
        activePlayer.playedCards.push(playedCard)
        activePlayer.hand.splice(playedCardIndex, 1)
        results = actionHandler.runAction(board, players, playedCard.actionObjects[0])
        board = results[0]
        players = results[1]
        return ([board, players])
    }
}