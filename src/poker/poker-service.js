const fiveCardPokerHandTypes = {
    ROYAL_FLUSH: {
        name: "Royal Flush",
        strength: 10
    },
    STRAIGHT_FLUSH: {
        name: "Straight Flush",
        strength: 9
    },
    FOUR_OF_A_KIND: {
        name: "Four Of A Kind",
        strength: 8
    },
    FULL_HOUSE: {
        name: "Full House",
        strength: 7
    },
    FLUSH: {
        name: "Flush",
        strength: 6
    },
    STRAIGHT: {
        name: "Straight",
        strength: 5
    },
    THREE_OF_A_KIND: {
        name: "Three Of A Kind",
        strength: 4
    },
    TWO_PAIR: {
        name: "Two Pair",
        strength: 3
    },
    PAIR: {
        name: "Pair",
        strength: 2
    },
    HIGH_CARD: {
        name: "High Card",
        strength: 1
    }
}

const createTwoPairHand = () => {
    let hand = [];

    hand.push({"suit": "Hearts", "rank": {name: "Three", number: 3}, "drawn": true});
    hand.push({"suit": "Spades", "rank": {name: "Three", number: 3}, "drawn": true});
    hand.push({"suit": "Clubs", "rank": {name: "Ace", number: 14}, "drawn": true});
    hand.push({"suit": "Diamonds", "rank": {name: "Jack", number: 11}, "drawn": true});
    hand.push({"suit": "Hearts", "rank": {name: "Ace", number: 14}, "drawn": true});

    return hand;
}

const createStraightHand = () => {
    let hand = [];

    hand.push({"suit": "Hearts", "rank": {name: "Three", number: 3}, "drawn": true});
    hand.push({"suit": "Spades", "rank": {name: "Two", number: 2}, "drawn": true});
    hand.push({"suit": "Clubs", "rank": {name: "Ace", number: 14}, "drawn": true});
    hand.push({"suit": "Diamonds", "rank": {name: "Five", number: 5}, "drawn": true});
    hand.push({"suit": "Hearts", "rank": {name: "Four", number: 4}, "drawn": true});

    return hand;
}

const evaluateHand = (hand) => {
    let straightStartAndEndRank = isStraight(hand);
    let flushHighRank = isFlush(hand);

    if (straightStartAndEndRank && flushHighRank) {
        if (straightStartAndEndRank[0].number === 10) {
            return ["ROYAL_FLUSH", hand[0].suit];
        } else {
            return ["STRAIGHT_FLUSH", straightStartAndEndRank[0].name + " To " + straightStartAndEndRank[1].name];
        }
    }

    let fourOfAKindRank = isFourOfAKind(hand);
    if (fourOfAKindRank) {
        return ["FOUR_OF_A_KIND", pluralizeName(fourOfAKindRank.name)];
    }

    let threeOfAKindRank = isThreeOfAKind(hand);
    if (threeOfAKindRank) {
        let fullHousePairRank = isFullHouse(hand, threeOfAKindRank);
        if (fullHousePairRank) {
            return ["FULL_HOUSE",
                pluralizeName(threeOfAKindRank.name) + " Full Of " +
                pluralizeName(fullHousePairRank.name)];
        } else {
            return ["THREE_OF_A_KIND", pluralizeName(threeOfAKindRank.name)];
        }
    }

    if (flushHighRank) {
        return ["FLUSH", flushHighRank.name + " High"];
    }

    if (straightStartAndEndRank) {
        return ["STRAIGHT", straightStartAndEndRank[0].name + " To " + straightStartAndEndRank[1].name];
    }

    let twoPairRanks = isTwoPair(hand);
    if (twoPairRanks) {
        return ["TWO_PAIR", pluralizeName(twoPairRanks[0].name) + " And " + pluralizeName(twoPairRanks[1].name)];
    }
    let pairRank = isPair(hand);
    if (pairRank) {
        return ["PAIR", pluralizeName(pairRank.name)];
    }
    let highCardRank = highCard(hand);
    return ["HIGH_CARD", highCardRank.name];
}

const pluralizeName = (name) => {
    if (name==="Six") return "Sixes";
    return name + "s";
}

const isFourOfAKind = (hand) => {
    for (let i=0; i<hand.length; i++) {
        let currentCard = hand[i];
        for (let j=i+1; j<hand.length; j++) {
            let secondCard = hand[j];
            if (currentCard.rank.number === secondCard.rank.number) {
                for (let k=j+1; k<hand.length; k++) {
                    let thirdCard = hand[k];
                    if (currentCard.rank.number === thirdCard.rank.number) {
                        for (let l=k+1; l<hand.length; l++) {
                            let fourthCard = hand[l];
                            if (currentCard.rank.number === fourthCard.rank.number) {
                                return currentCard.rank;
                            }
                        }
                    }
                }
            }
        }
    }
    return "";
}

const isFullHouse = (hand, threeOfAKindRank) => {
    for (let i=0; i<hand.length; i++) {
        if (hand[i].rank.number !== threeOfAKindRank.number) {
            for (let j=i+1; j<hand.length; j++) {
                if (hand[j].rank.number === hand[i].rank.number) {
                    return hand[i].rank;
                }
            }
        }
    }
    return "";
}

const isFlush = (hand) => {
    let maxRank = hand[0].rank;
    for (let i=1; i<hand.length; i++) {
        if (hand[i].suit !== hand[0].suit) {
            return "";
        } else if (hand[i].rank.number > maxRank.number) {
            maxRank = hand[i].rank;
        }
    }
    return maxRank;
}

const isStraight = (hand) => {
    let minRank = hand[0].rank;
    let maxRank = null;
    for (let i=1; i<hand.length; i++) {
        if (hand[i].rank.number < minRank.number) {
            minRank = hand[i].rank;
        }
    }
    let nextRank = minRank;
    for (let i=0; i<4; i++) {
        let foundNext = false;
        for (let j=0; j<hand.length; j++) {
            if (hand[j].rank.number === nextRank.number + 1) {
                foundNext = true;
                nextRank = hand[j].rank;
                if (i===3) {
                    maxRank = hand[j].rank;
                }
                j = hand.length;
            } else if (hand[j].rank.number === 14 && nextRank.number===5 && i===3) {
                foundNext = true;
                minRank = hand[j].rank;
                maxRank = nextRank;
                j = hand.length;
            }
        }
        if (!foundNext) {
            return "";
        }
    }
    return [minRank, maxRank];
}

const isThreeOfAKind = (hand) => {
    for (let i=0; i<hand.length; i++) {
        let currentCard = hand[i];
        for (let j=i+1; j<hand.length; j++) {
            let secondCard = hand[j];
            if (currentCard.rank.number === secondCard.rank.number) {
                for (let k=j+1; k<hand.length; k++) {
                    let thirdCard = hand[k];
                    if (currentCard.rank.number === thirdCard.rank.number) {
                        return currentCard.rank;
                    }
                }
            }
        }
    }
    return "";
}

const isTwoPair = (hand) => {
    let pairRank = isPair(hand);
    if (!pairRank) {
        return null;
    }
    for (let i=0; i<hand.length; i++) {
        if (hand[i].rank.number !== pairRank.number) {
            let secondPairRankAttempt = hand[i].rank;
            for (let j=i+1; j<hand.length; j++) {
                if (hand[j].rank.number === secondPairRankAttempt.number) {
                    if (pairRank.number > secondPairRankAttempt.number) {
                        return [pairRank, secondPairRankAttempt];
                    } else {
                        return [secondPairRankAttempt, pairRank];
                    }
                }
            }
        }
    }
}

const isPair = (hand) => {
    for (let i=0; i<hand.length; i++) {
        let currentCard = hand[i];
        for (let j=i+1; j<hand.length; j++) {
            let secondCard = hand[j];
            if (currentCard.rank.number === secondCard.rank.number) {
                return currentCard.rank;
            }
        }
    }
    return null;
}

const highCard = (hand) => {
    let rank = hand[0].rank;
    for (let i=1; i<hand.length; i++) {
        if (hand[i].rank.number > rank.number) {
            rank = hand[i].rank;
        }
    }
    return rank;
}

export default {
    evaluateHand,
    createTwoPairHand,
    createStraightHand,
    fiveCardPokerHandTypes,
}