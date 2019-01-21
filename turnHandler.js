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
function cardIndex(board, players){
    var playedCardIndex = players[board.activePlayer].hand.findIndex(card => {
        return card.UID === cardUID
      })
    return playedCardIndex
}
function card(board, players){
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
        playedCard = card(board, players)
        playedCardIndex = cardIndex(board, players)

        console.log(playedCard);

        return ([board, players])
    }
}