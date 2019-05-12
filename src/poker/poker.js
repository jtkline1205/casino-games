import React from 'react';
import style from './poker.css'
import AceClubs from '../img/ace_clubs.png'
import TwoClubs from '../img/two_clubs.png'
import ThreeClubs from '../img/three_clubs.png'
import FourClubs from '../img/four_clubs.png'
import FiveClubs from '../img/five_clubs.png'
import SixClubs from '../img/six_clubs.png'
import SevenClubs from '../img/seven_clubs.png'
import EightClubs from '../img/eight_clubs.png'
import NineClubs from '../img/nine_clubs.png'
import TenClubs from '../img/ten_clubs.png'
import JackClubs from '../img/jack_clubs.png'
import QueenClubs from '../img/queen_clubs.png'
import KingClubs from '../img/king_clubs.png'
import AceDiamonds from '../img/ace_diamonds.png'
import TwoDiamonds from '../img/two_diamonds.png'
import ThreeDiamonds from '../img/three_diamonds.png'
import FourDiamonds from '../img/four_diamonds.png'
import FiveDiamonds from '../img/five_diamonds.png'
import SixDiamonds from '../img/six_diamonds.png'
import SevenDiamonds from '../img/seven_diamonds.png'
import EightDiamonds from '../img/eight_diamonds.png'
import NineDiamonds from '../img/nine_diamonds.png'
import TenDiamonds from '../img/ten_diamonds.png'
import JackDiamonds from '../img/jack_diamonds.png'
import QueenDiamonds from '../img/queen_diamonds.png'
import KingDiamonds from '../img/king_diamonds.png'
import AceSpades from '../img/ace_spades.png'
import TwoSpades from '../img/two_spades.png'
import ThreeSpades from '../img/three_spades.png'
import FourSpades from '../img/four_spades.png'
import FiveSpades from '../img/five_spades.png'
import SixSpades from '../img/six_spades.png'
import SevenSpades from '../img/seven_spades.png'
import EightSpades from '../img/eight_spades.png'
import NineSpades from '../img/nine_spades.png'
import TenSpades from '../img/ten_spades.png'
import JackSpades from '../img/jack_spades.png'
import QueenSpades from '../img/queen_spades.png'
import KingSpades from '../img/king_spades.png'
import AceHearts from '../img/ace_hearts.png'
import TwoHearts from '../img/two_hearts.png'
import ThreeHearts from '../img/three_hearts.png'
import FourHearts from '../img/four_hearts.png'
import FiveHearts from '../img/five_hearts.png'
import SixHearts from '../img/six_hearts.png'
import SevenHearts from '../img/seven_hearts.png'
import EightHearts from '../img/eight_hearts.png'
import NineHearts from '../img/nine_hearts.png'
import TenHearts from '../img/ten_hearts.png'
import JackHearts from '../img/jack_hearts.png'
import QueenHearts from '../img/queen_hearts.png'
import KingHearts from '../img/king_hearts.png'


export default class Poker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Welcome to Poker",
            hand:[],
            handTypes: {
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
        };
    }

    componentDidMount() {

    }

    createDeck() {
        const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
        const ranks = [
            {name:'Ace', number:14}, {name:'King', number:13}, {name:'Queen', number:12},
            {name:'Jack', number:11}, {name:'Ten', number:10},
            {name:'Nine', number:9}, {name:'Eight', number:8}, {name:'Seven', number:7}, {name:'Six', number:6},
            {name:'Five', number:5}, {name:'Four', number:4}, {name:'Three', number:3}, {name:'Two', number:2}
        ];
        var deck = [];

        for (var i=0; i<suits.length; i++) {
            for (var j = 0; j < ranks.length; j++) {
                deck.push({"suit": suits[i], "rank": ranks[j], "drawn":false});
            }
        }

        return deck;
    }

    drawCard(deck) {
        //will not work on fully drawn deck. fix
        while (true) {
            var i = Math.floor(Math.random()*deck.length);
            if (!deck[i].drawn) {
                deck[i].drawn=true;
                return deck[i];
            }
        }
    }

    evaluateHand(hand) {
        var straightStartAndEndRank = this.isStraight(hand);
        var flushHighRank = this.isFlush(hand);

        if (straightStartAndEndRank && flushHighRank) {
            if (straightStartAndEndRank[0].number == 10) {
                return ["ROYAL_FLUSH", hand[0].suit];
            } else {
                return ["STRAIGHT_FLUSH", straightStartAndEndRank[0].name + " To " + straightStartAndEndRank[1].name];
            }
        }

        var fourOfAKindRank = this.isFourOfAKind(hand);
        if (fourOfAKindRank) {
            return ["FOUR_OF_A_KIND", this.pluralizeName(fourOfAKindRank.name)];
        }

        var threeOfAKindRank = this.isThreeOfAKind(hand);
        if (threeOfAKindRank) {
            var fullHousePairRank = this.isFullHouse(hand, threeOfAKindRank);
            if (fullHousePairRank) {
                return ["FULL_HOUSE",
                this.pluralizeName(threeOfAKindRank.name) + " Full Of " +
                this.pluralizeName(fullHousePairRank.name)];
            } else {
                return ["THREE_OF_A_KIND", this.pluralizeName(threeOfAKindRank.name)];
            }
        }

        if (flushHighRank) {
            return ["FLUSH", flushHighRank.name + " High"];
        }

        if (straightStartAndEndRank) {
            return ["STRAIGHT", straightStartAndEndRank[0].name + " To " + straightStartAndEndRank[1].name];
        }

        var twoPairRanks = this.isTwoPair(hand);
        if (twoPairRanks) {
            return ["TWO_PAIR", this.pluralizeName(twoPairRanks[0].name) + " And " + this.pluralizeName(twoPairRanks[1].name)];
        }
        var pairRank = this.isPair(hand);
        if (pairRank) {
            return ["PAIR", this.pluralizeName(pairRank.name)];
        }
        var highCardRank = this.highCard(hand);
        return ["HIGH_CARD", highCardRank.name];
    }

    pluralizeName(name) {
        if (name=="Six") return "Sixes";
        return name + "s";
    }

    isFourOfAKind(hand) {
        for (var i=0; i<hand.length; i++) {
            var currentCard = hand[i];
            for (var j=i+1; j<hand.length; j++) {
                var secondCard = hand[j];
                if (currentCard.rank.number == secondCard.rank.number) {
                    for (var k=j+1; k<hand.length; k++) {
                        var thirdCard = hand[k];
                        if (currentCard.rank.number == thirdCard.rank.number) {
                            for (var l=k+1; l<hand.length; l++) {
                                var fourthCard = hand[l];
                                if (currentCard.rank.number == fourthCard.rank.number) {
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

    isFullHouse(hand, threeOfAKindRank) {
        for (var i=0; i<hand.length; i++) {
            if (hand[i].rank.number != threeOfAKindRank.number) {
                for (var j=i+1; j<hand.length; j++) {
                    if (hand[j].rank.number == hand[i].rank.number) {
                        return hand[i].rank;
                    }
                }
            }
        }
        return "";
    }

    isFlush(hand) {
        var maxRank = hand[0].rank;
        for (var i=1; i<hand.length; i++) {
            if (hand[i].suit != hand[0].suit) {
                return "";
            } else if (hand[i].rank.number > maxRank.number) {
                maxRank = hand[i].rank;
            }
        }
        return maxRank;
    }

    isStraight(hand) {
        var minRank = hand[0].rank;
        var maxRank = null;
        for (var i=1; i<hand.length; i++) {
            if (hand[i].rank.number < minRank.number) {
                minRank = hand[i].rank;
            }
        }
        var nextRank = minRank;
        for (var i=0; i<4; i++) {
            for (var j=0; j<hand.length; j++) {
                var foundNext = false;
                if (hand[j].rank.number == nextRank.number + 1) {
                    foundNext = true;
                    nextRank = hand[j].rank;
                    if (i==3) {
                        maxRank = hand[j].rank;
                    }
                    j = hand.length;
                } else if (hand[j].rank.number == 14 && nextRank.number==5 && i==3) {
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

    isThreeOfAKind(hand) {
        for (var i=0; i<hand.length; i++) {
            var currentCard = hand[i];
            for (var j=i+1; j<hand.length; j++) {
                var secondCard = hand[j];
                if (currentCard.rank.number == secondCard.rank.number) {
                    for (var k=j+1; k<hand.length; k++) {
                        var thirdCard = hand[k];
                        if (currentCard.rank.number == thirdCard.rank.number) {
                            return currentCard.rank;
                        }
                    }
                }
            }
        }
        return "";
    }

    isTwoPair(hand) {
        var pairRank = this.isPair(hand);
        if (!pairRank) {
            return null;
        }
        for (var i=0; i<hand.length; i++) {
            if (hand[i].rank.number != pairRank.number) {
                var secondPairRankAttempt = hand[i].rank;
                for (var j=i+1; j<hand.length; j++) {
                    if (hand[j].rank.number == secondPairRankAttempt.number) {
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

    isPair(hand) {
        for (var i=0; i<hand.length; i++) {
            var currentCard = hand[i];
            for (var j=i+1; j<hand.length; j++) {
                var secondCard = hand[j];
                if (currentCard.rank.number == secondCard.rank.number) {
                    return currentCard.rank;
                }
            }
        }
        return null;
    }

    highCard(hand) {
        var rank = hand[0].rank;
        for (var i=1; i<hand.length; i++) {
            if (hand[i].rank.number > rank.number) {
                rank = hand[i].rank;
            }
        }
        return rank;
    }

    drawHandFromDeck(deck) {
        var hand = [];
        for (var i=0; i<5; i++) {
            hand.push(this.drawCard(deck));
        }
        return hand;
    }

    displayRuns(numberOfRuns) {
        var resultsDict = {ROYAL_FLUSH:[], STRAIGHT_FLUSH:[], FOUR_OF_A_KIND:[], FULL_HOUSE:[], FLUSH:[],
            STRAIGHT:[], THREE_OF_A_KIND:[], TWO_PAIR:[], PAIR:[], HIGH_CARD:[]};
        for (var i=0; i<numberOfRuns; i++) {
            var newDeck = this.createDeck();
            var hand = this.drawHandFromDeck(newDeck);
            resultsDict[this.evaluateHand(hand)[0]].push(hand);
        }
        return <div>
            Royal Flush <br/>
            {resultsDict["ROYAL_FLUSH"].length} <br/>
            {/*{this.paintHands(resultsDict["ROYAL_FLUSH"])}*/}
            Straight Flush <br/>
            {resultsDict["STRAIGHT_FLUSH"].length} <br/>
            {/*{this.paintHands(resultsDict["STRAIGHT_FLUSH"])}*/}
            Four Of A Kind <br/>
            {resultsDict["FOUR_OF_A_KIND"].length} <br/>
            {/*{this.paintHands(resultsDict["FOUR_OF_A_KIND"])}*/}
            Full House <br/>
            {resultsDict["FULL_HOUSE"].length} <br/>
            {/*{this.paintHands(resultsDict["FULL_HOUSE"])}*/}
            Flush <br/>
            {resultsDict["FLUSH"].length} <br/>
            {/*{this.paintHands(resultsDict["FLUSH"])}*/}
            Straight <br/>
            {resultsDict["STRAIGHT"].length} <br/>
            {/*{this.paintHands(resultsDict["STRAIGHT"])}*/}
            Three Of A Kind <br/>
            {resultsDict["THREE_OF_A_KIND"].length} <br/>
            {/*{this.paintHands(resultsDict["THREE_OF_A_KIND"])}*/}
            Two Pair <br/>
            {resultsDict["TWO_PAIR"].length} <br/>
            {/*{this.paintHands(resultsDict["TWO_PAIR"])}*/}
            Pair <br/>
            {resultsDict["PAIR"].length} <br/>
            {/*{this.paintHands(resultsDict["PAIR"])}*/}
            High Card <br/>
            {resultsDict["HIGH_CARD"].length} <br/>
            {/*{this.paintHands(resultsDict["HIGH_CARD"])}*/}
        </div>
    }

    getDisplayableHandEvaluation(handEvaluation) {
        return this.state.handTypes[handEvaluation[0]].name + ", " + handEvaluation[1]
    }

    paintHands(hands) {
        function getImageSource(rank, suit) {
            switch(suit) {
                case "Clubs":
                    switch (rank) {
                        case "Ace":
                            return AceClubs;
                            break;
                        case "Two":
                            return TwoClubs;
                            break;
                        case "Three":
                            return ThreeClubs;
                            break;
                        case "Four":
                            return FourClubs;
                            break;
                        case "Five":
                            return FiveClubs;
                            break;
                        case "Six":
                            return SixClubs;
                            break;
                        case "Seven":
                            return SevenClubs;
                            break;
                        case "Eight":
                            return EightClubs;
                            break;
                        case "Nine":
                            return NineClubs;
                            break;
                        case "Ten":
                            return TenClubs;
                            break;
                        case "Jack":
                            return JackClubs;
                            break;
                        case "Queen":
                            return QueenClubs;
                            break;
                        case "King":
                            return KingClubs;
                            break;
                    }
                    break;
                case "Diamonds":
                    switch(rank) {
                        case "Ace":
                            return AceDiamonds;
                            break;
                        case "Two":
                            return TwoDiamonds;
                            break;
                        case "Three":
                            return ThreeDiamonds;
                            break;
                        case "Four":
                            return FourDiamonds;
                            break;
                        case "Five":
                            return FiveDiamonds;
                            break;
                        case "Six":
                            return SixDiamonds;
                            break;
                        case "Seven":
                            return SevenDiamonds;
                            break;
                        case "Eight":
                            return EightDiamonds;
                            break;
                        case "Nine":
                            return NineDiamonds;
                            break;
                        case "Ten":
                            return TenDiamonds;
                            break;
                        case "Jack":
                            return JackDiamonds;
                            break;
                        case "Queen":
                            return QueenDiamonds;
                            break;
                        case "King":
                            return KingDiamonds;
                            break;
                    }
                    break;
                case "Spades":
                    switch(rank) {
                        case "Ace":
                            return AceSpades;
                            break;
                        case "Two":
                            return TwoSpades;
                            break;
                        case "Three":
                            return ThreeSpades;
                            break;
                        case "Four":
                            return FourSpades;
                            break;
                        case "Five":
                            return FiveSpades;
                            break;
                        case "Six":
                            return SixSpades;
                            break;
                        case "Seven":
                            return SevenSpades;
                            break;
                        case "Eight":
                            return EightSpades;
                            break;
                        case "Nine":
                            return NineSpades;
                            break;
                        case "Ten":
                            return TenSpades;
                            break;
                        case "Jack":
                            return JackSpades;
                            break;
                        case "Queen":
                            return QueenSpades;
                            break;
                        case "King":
                            return KingSpades;
                            break;
                    }
                    break;
                case "Hearts":
                    switch(rank) {
                        case "Ace":
                            return AceHearts;
                            break;
                        case "Two":
                            return TwoHearts;
                            break;
                        case "Three":
                            return ThreeHearts;
                            break;
                        case "Four":
                            return FourHearts;
                            break;
                        case "Five":
                            return FiveHearts;
                            break;
                        case "Six":
                            return SixHearts;
                            break;
                        case "Seven":
                            return SevenHearts;
                            break;
                        case "Eight":
                            return EightHearts;
                            break;
                        case "Nine":
                            return NineHearts;
                            break;
                        case "Ten":
                            return TenHearts;
                            break;
                        case "Jack":
                            return JackHearts;
                            break;
                        case "Queen":
                            return QueenHearts;
                            break;
                        case "King":
                            return KingHearts;
                            break;
                    }
                    break;
            }
        }

        function getKey(hand) {
            return hand[0].rank+hand[1].rank+hand[2].rank+hand[3].rank+hand[4].rank;
        }

        return <table>
            <tbody>
            {hands.map(function(hand) {
                return <tr key={getKey(hand)}>
                    {
                        hand.map(function (card) {
                            var imageSource = getImageSource(card.rank.name, card.suit);
                            return <td key={card.rank.name + card.suit}>
                                <img src={imageSource}/>
                            </td>
                        })
                    }
                </tr>
            })}
            </tbody>
        </table>
    }

    createTwoPairHand() {
        var hand = [];

        hand.push({"suit": "Hearts", "rank": {name: "Three", number: 3}, "drawn": true});
        hand.push({"suit": "Spades", "rank": {name: "Three", number: 3}, "drawn": true});
        hand.push({"suit": "Clubs", "rank": {name: "King", number: 13}, "drawn": true});
        hand.push({"suit": "Diamonds", "rank": {name: "Jack", number: 11}, "drawn": true});
        hand.push({"suit": "Hearts", "rank": {name: "King", number: 13}, "drawn": true});

        return hand;
    }

    render() {
        var deck = this.createDeck();
        this.state.hand = this.drawHandFromDeck(deck);
        var handsToDisplay = [];
        handsToDisplay.push(this.state.hand);
        return <div className={style.gameContainer}>
            <h5>Poker</h5>
            {this.state.message} <br/>
            {this.paintHands(handsToDisplay)} <br/>
            You Drew: <br/>
            {this.getDisplayableHandEvaluation(this.evaluateHand(handsToDisplay[0]))}
        </div>
    }
}
