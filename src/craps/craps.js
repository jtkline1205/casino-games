import React from 'react';
import style from './craps.css'

export default class Craps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Welcome to Craps"
        };
    }

    componentDidMount() {

    }

    evaluateDiceRoll(diceResult) {
        var higherRoll = (diceResult[0] >= diceResult[1]) ? diceResult[0] : diceResult[1];
        var lowerRoll =  (diceResult[0] >= diceResult[1]) ? diceResult[1] : diceResult[0];
        switch(lowerRoll) {
            case 1:
                switch(higherRoll) {
                    case 1:
                        return "Snake Eyes";
                        break;
                    case 2:
                        return "Ace Deuce";
                        break;
                    case 3:
                        return "Soft Four";
                        break;
                    case 4:
                        return "No Field Five";
                        break;
                    case 5:
                        return "Soft Six";
                    case 6:
                        return "Seven Out";
                        break;
                }
                break;
            case 2:
                switch(higherRoll) {
                    case 2:
                        return "Hard Four";
                        break;
                    case 3:
                        return "No Field Five";
                        break;
                    case 4:
                        return "Soft Six";
                        break;
                    case 5:
                        return "Seven Out";
                    case 6:
                        return "Soft Eight";
                        break;
                }
                break;
            case 3:
                switch(higherRoll) {
                    case 3:
                        return "Hard Six";
                        break;
                    case 4:
                        return "Seven Out";
                        break;
                    case 5:
                        return "Soft Eight";
                    case 6:
                        return "Nine Nina";
                        break;
                }
                break;
            case 4:
                switch(higherRoll) {
                    case 4:
                        return "Hard Eight";
                        break;
                    case 5:
                        return "Nine Nina";
                    case 6:
                        return "Soft Ten";
                        break;
                }
                break;
            case 5:
                switch(higherRoll) {
                    case 5:
                        return "Hard Ten";
                    case 6:
                        return "Yo-Leven";
                        break;
                }
                break;
            case 6:
                switch(higherRoll) {
                    case 6:
                        return "Boxcars";
                        break;
                }
                break;
        }
    }

    rollTwoDice() {
        return [this.rollOneDie(), this.rollOneDie()];
    }

    rollOneDie() {
        return Math.floor(Math.random()*6)+1;
    }

    render() {
        var diceResult = this.rollTwoDice();
        return <div className={style.gameContainer}>
            <h5>Craps</h5>
            {this.state.message} <br/>
            You Rolled: <br/>
            {diceResult[0]} , {diceResult[1]} <br/>
            {this.evaluateDiceRoll(diceResult)} <br/>
        </div>
    }
}
