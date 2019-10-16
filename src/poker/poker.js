import React from 'react';
import style from './poker.css'
import CasinoConstants from '../casino_constants'
import PokerService from './poker-service.js'
import Card from '../card'

export default class Poker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Welcome to Poker",
            hand:[],
        };
    }

    componentDidMount() {

    }

    static displayRuns(numberOfRuns) {
        let resultsDict = {ROYAL_FLUSH:[], STRAIGHT_FLUSH:[], FOUR_OF_A_KIND:[], FULL_HOUSE:[], FLUSH:[],
            STRAIGHT:[], THREE_OF_A_KIND:[], TWO_PAIR:[], PAIR:[], HIGH_CARD:[]};
        for (let i=0; i<numberOfRuns; i++) {
            let newDeck = CasinoConstants.create52CardDeck();
            let hand = CasinoConstants.drawHandFromDeck(newDeck);
            resultsDict[PokerService.evaluateHand(hand)[0]].push(hand);
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

    static getDisplayableHandEvaluation(handEvaluation) {
        return PokerService.fiveCardPokerHandTypes[handEvaluation[0]].name + ", " + handEvaluation[1]
    }

    static paintHands(hands) {
        return <table>
            <tbody>
            {hands.map(function(hand) {
                return <tr key={hand[0].rank+hand[1].rank+hand[2].rank+hand[3].rank+hand[4].rank}>
                    {
                        hand.map(function (card) {
                            return <td key={card.rank.name + card.suit}>
                                <Card rank={card.rank.name} suit={card.suit}/>
                            </td>
                        })
                    }
                </tr>
            })}
            </tbody>
        </table>
    }



    render() {
        let deck = CasinoConstants.create52CardDeck();
        this.state.hand = CasinoConstants.drawAHandFromDeck(deck, 5);
        // this.state.hand = PokerService.createTwoPairHand();
        // this.state.hand = PokerService.createStraightHand();
        let handsToDisplay = [];
        handsToDisplay.push(this.state.hand);
        return <div className={style.gameContainer}>
            <h5>Poker</h5>
            {this.state.message} <br/>
            {Poker.paintHands(handsToDisplay)} <br/>
            You Drew: <br/>
            {Poker.getDisplayableHandEvaluation(PokerService.evaluateHand(handsToDisplay[0]))}
        </div>
    }
}
