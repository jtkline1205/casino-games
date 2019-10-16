import React from 'react';
import style from './hand.css'
import Card from '../card'

export default class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return <div>
            <table>
                <tbody>
                <tr>
                    {
                        this.props.hand.map(function(card) {
                            return <td key={card.rank.name+card.suit}><Card rank={card.rank.name} suit={card.suit}/></td>
                        })
                    }
                </tr>
                </tbody>
            </table>
        </div>
    }
}