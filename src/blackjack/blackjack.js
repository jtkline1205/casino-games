import React from 'react';
import style from './blackjack.css'

export default class Craps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Welcome to Blackjack"
        };
    }

    componentDidMount() {

    }

    render() {
        return <div className={style.gameContainer}>
            <h5>Blackjack</h5>
            {this.state.message}
            <br/>
        </div>
    }
}
