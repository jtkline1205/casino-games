import React from 'react';
import style from './blackjack.css'
import Hand from '../hand'
import CasinoConstants from '../casino_constants'
import BlackjackService from './blackjack-service'

export default class Blackjack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Welcome to Blackjack",
            deck: CasinoConstants.create52CardDeck(),
            playerHand: [],
            dealerHand: []
        };
        this.hit = this.hit.bind(this);
    }

    componentDidMount() {
        let playerCard1 = CasinoConstants.drawCardFromDeck(this.state.deck);
        let dealerUpCard = CasinoConstants.drawCardFromDeck(this.state.deck);
        let playerCard2 = CasinoConstants.drawCardFromDeck(this.state.deck);
        let dealerHoleCard = CasinoConstants.drawCardFromDeck(this.state.deck);

        this.setState({
            playerHand: [playerCard1, playerCard2],
            dealerHand: [dealerUpCard, dealerHoleCard]
        });
    }

    hit() {
        this.setState(state => ({
            playerHand: [...state.playerHand, CasinoConstants.drawCardFromDeck(state.deck)]
        }));
    }

    render() {
        return <div className={style.gameContainer}>
            <h5>Blackjack</h5>
            {this.state.message} <br/>
            Dealer stands on 17 <br/>
            Dealer has a {BlackjackService.calculateValue(this.state.dealerHand)}<br/>
            <Hand hand={this.state.dealerHand}/><br/>
            <Hand hand={this.state.playerHand}/><br/>
            Player has a {BlackjackService.calculateValue(this.state.playerHand)}<br/>


            <input type="button" value="Hit" onClick={this.hit}></input>
        </div>


        // for (int i = 1; i <= TOTAL_ROUNDS; i++) {
        //     log("Creating Shoe for Round " + i);
        //     shoe = new Shoe(DECKS_IN_SHOE);
        //     resetBlackjackPanel(false);
        //     while (shoe.getNumberOfCardsInShoe() >= SHOE_CARD_LIMIT && playerBankroll >= PLAYER_BANKROLL_LIMIT) {
        //         playerBet = 0.0;
        //         blackjackPanel.enableChipButtons(playerBankroll);
        //         waitForBetInput();
        //         resetBlackjackPanel(true);
        //         Double bankrollChange = playAndResolveNewRound();
        //         playerBankroll += bankrollChange;
        //         blackjackPanel.updateResultPanel(bankrollChange);
        //         pack();
        //     }
        // }
    }
}
