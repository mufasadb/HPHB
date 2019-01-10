const hogwartsCards = require('./hogwartsCardDecleration.json')
const hogwartsSet = Object.keys(hogwartsCards).map(function (_) { return hogwartsCards[_]; })

module.exports = {
    choices: function (UID) {
        let submittedCard = hogwartsSet.find(x => x.UID === UID);
        let decisions = submittedCard.decisions
            
        return decisions
    }
}