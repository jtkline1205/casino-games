import React from 'react';
import style from './card.css'
import CasinoConstants from '../casino_constants'

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return <div>
            <img src={CasinoConstants.cardImages[this.props.rank + this.props.suit]}/>
        </div>
    }
}