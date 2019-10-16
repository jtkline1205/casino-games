const calculateValue = (hand) => {
    if (!hand) return 0;
    if (hand.length==0) return 0;
    let returnValue = 0;
    let acesAs11s = 0;
    hand.forEach(card => {
        returnValue += (card.rank.blackjackValue ? card.rank.blackjackValue : card.rank.number);
        if (card.rank.number==14) {
            acesAs11s++;
        }
    });
    while (returnValue > 21 && acesAs11s > 0) {
        returnValue -= 10;
        acesAs11s--;
    }
    return returnValue;
}

export default {
    calculateValue
}