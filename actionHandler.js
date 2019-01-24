const hogwartsCards = require('./hogwartsCardDecleration.json')
const cardHandler = require('./cardHandler')
// let actionObject{
//     "who": "Active",
//     "whoType": "Player",
//     "action": "Gains",
//     "quantity":"1",
//     "conditionalQuantity":"",
//     "resource":"Gold"
// }
function modifyGold(player, quantity) {
    player.gold = player.gold + quantity
    return player
}
function modifyLightning(player, quantity) {
    player.lightning = player.lightning + quantity
    return player
}
function modifyHealth(player, quantity) {
    player.health = player.health + quantity
    if (player.health > 10) {
        player.health = 10
    }
    if (player.health < 0) {
        console.log("the player has been stunned")
    }
    return player
}
function handleAll(players, resource, quantity) {
    if (resource === 'Health') {
        for (let i = 0; i < players.length; i++) {
            players[i] = modifyHealth(players[i], quantity)
        }
    }
    if (resource === 'Gold') {
        for (let i = 0; i < players.length; i++) {
            players[i] = modifyGold(players[i], quantity)
        }
    } if (resource === 'Lightning') {
        for (let i = 0; i < players.length; i++) {
            players[i] = modifyLightning(players[i], quantity)
        }
    }    if (resource = 'Draw') {
        results = cardHanlder.playerDraw(players[i].deck, players[i].hand, players[i].discardPile, quantity)
        players[i].deck = results[0]
        players[i].hand = results[1]
        players[i].discardPile = results[2]
    }

    return players
}
function handleSingle(board, players, resource, quantity) {
    if (resource === 'Health') {
        players[board.activePlayer] = modifyHealth(players[board.activePlayer], quantity)
    }
    if (resource === 'Gold') {
        players[board.activePlayer] = modifyGold(players[board.activePlayer], quantity)
    }
    if (resource === 'Lightning') {
        players[board.activePlayer] = modifyLightning(players[board.activePlayer], quantity)
    }
    if (resource === 'Draw') {
        results = cardHandler.playerDraw(players[board.activePlayer].deck, players[board.activePlayer].hand, players[board.activePlayer].discardPile, quantity)
        players[board.activePlayer].deck = results[0]
        players[board.activePlayer].hand = results[1]
        players[board.activePlayer].discardPile = results[2]
    }
    return players
}
module.exports = {
    runAction: function (board, players, actionObject) {
        if (actionObject.whoType === 'Player') {
            if (actionObject.who === 'Active') {
                players = handleSingle(board, players, actionObject.resource, parseInt(actionObject.quantity))
            } else if (actionObject.who === 'All'){
                players = handleAll(board, players, actionObject.resource, parseInt(actionObject.quantity))
            } else (console.log('action Object has an unreadable "who value"'))
        }
        return ([board, players])
    }
}