const actionHandler = require("./actionHandler");
function changeTurns(activePlayer, playerCap){
    if(activePlayer === playerCap){
        activePlayer = 1
    }else if(activePlayer === 0){
        activePlayer = 1
    }else {
    activePlayer = activePlayer + 1}
    return activePlayer
}
function refillHoggies(hogwartsCards){
    while(hogwartsCards.faceUpCards.length < 6){
        
    }
    return hogwartsCards
}
function cardIndex(board, players, cardUID){
    var playedCardIndex = players[board.activePlayer].hand.findIndex(card => {
        return card.UID === cardUID
      })
    return playedCardIndex
}
function card(board, players, cardUID){
    var playedCard = players[board.activePlayer].hand.find(card => {
        return card.UID === cardUID
      })
    return playedCard
}
module.exports = {
    endTurn: function (board, players, hogwartsCards, playerCap){
        console.log(board.activePlayer)
        console.log('cap is' + playerCap)
        board.activePlayer = changeTurns(board.activePlayer, playerCap)
        hogwartsCards = refillHoggies(hogwartsCards)

        return ([board, players, hogwartsCards])
    },
    playCard: function (board, players, cardUID, actions){
        playedCard = card(board, players, cardUID)
        playedCardIndex = cardIndex(board, players, cardUID)
        players[board.activePlayer].playedCards.push(playedCard)
        players[board.activePlayer].hand.splice(playedCardIndex, 1)
        results = actionHandler.runAction(board,players, playedCard.actionObjects[0])
        board = results[0]
        players = results[1]

        return ([board, players])
    }
}