import React from 'react';
import Craps from '../craps'
import Poker from '../poker'
import Blackjack from '../blackjack'
import style from './app.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return <div className={style.container}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <Poker/>
                    </td>
                    <td>
                        <Craps/>
                    </td>
                    <td>
                        <Blackjack/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    }
}