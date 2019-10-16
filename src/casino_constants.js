import AceClubs from './img/ace_clubs.png'
import TwoClubs from './img/two_clubs.png'
import ThreeClubs from './img/three_clubs.png'
import FourClubs from './img/four_clubs.png'
import FiveClubs from './img/five_clubs.png'
import SixClubs from './img/six_clubs.png'
import SevenClubs from './img/seven_clubs.png'
import EightClubs from './img/eight_clubs.png'
import NineClubs from './img/nine_clubs.png'
import TenClubs from './img/ten_clubs.png'
import JackClubs from './img/jack_clubs.png'
import QueenClubs from './img/queen_clubs.png'
import KingClubs from './img/king_clubs.png'
import AceDiamonds from './img/ace_diamonds.png'
import TwoDiamonds from './img/two_diamonds.png'
import ThreeDiamonds from './img/three_diamonds.png'
import FourDiamonds from './img/four_diamonds.png'
import FiveDiamonds from './img/five_diamonds.png'
import SixDiamonds from './img/six_diamonds.png'
import SevenDiamonds from './img/seven_diamonds.png'
import EightDiamonds from './img/eight_diamonds.png'
import NineDiamonds from './img/nine_diamonds.png'
import TenDiamonds from './img/ten_diamonds.png'
import JackDiamonds from './img/jack_diamonds.png'
import QueenDiamonds from './img/queen_diamonds.png'
import KingDiamonds from './img/king_diamonds.png'
import AceSpades from './img/ace_spades.png'
import TwoSpades from './img/two_spades.png'
import ThreeSpades from './img/three_spades.png'
import FourSpades from './img/four_spades.png'
import FiveSpades from './img/five_spades.png'
import SixSpades from './img/six_spades.png'
import SevenSpades from './img/seven_spades.png'
import EightSpades from './img/eight_spades.png'
import NineSpades from './img/nine_spades.png'
import TenSpades from './img/ten_spades.png'
import JackSpades from './img/jack_spades.png'
import QueenSpades from './img/queen_spades.png'
import KingSpades from './img/king_spades.png'
import AceHearts from './img/ace_hearts.png'
import TwoHearts from './img/two_hearts.png'
import ThreeHearts from './img/three_hearts.png'
import FourHearts from './img/four_hearts.png'
import FiveHearts from './img/five_hearts.png'
import SixHearts from './img/six_hearts.png'
import SevenHearts from './img/seven_hearts.png'
import EightHearts from './img/eight_hearts.png'
import NineHearts from './img/nine_hearts.png'
import TenHearts from './img/ten_hearts.png'
import JackHearts from './img/jack_hearts.png'
import QueenHearts from './img/queen_hearts.png'
import KingHearts from './img/king_hearts.png'

const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];

const ranks = [
    {name:'Ace', number:14, blackjackValue:11},
    {name:'King', number:13, blackjackValue:10},
    {name:'Queen', number:12, blackjackValue:10},
    {name:'Jack', number:11, blackjackValue:10},
    {name:'Ten', number:10, blackjackValue:10},
    {name:'Nine', number:9},
    {name:'Eight', number:8},
    {name:'Seven', number:7},
    {name:'Six', number:6},
    {name:'Five', number:5},
    {name:'Four', number:4},
    {name:'Three', number:3},
    {name:'Two', number:2}
];

const create52CardDeck = () => {
    let deck = [];

    for (let i=0; i<suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            deck.push({"suit": suits[i], "rank": ranks[j], "drawn":false});
        }
    }

    return deck;
}

const drawCardFromDeck = (deck) => {
    let cardsLeft = false, i=0;
    while (i<deck.length && !cardsLeft) {
        if (!deck[i].drawn) {
            cardsLeft = true;
        }
        i++;
    }
    while (cardsLeft) {
        let i = Math.floor(Math.random()*deck.length);
        if (!deck[i].drawn) {
            deck[i].drawn=true;
            return deck[i];
        }
    }
    return "";
}

const drawAHandFromDeck = (deck, handSize) => {
    let hand = [];
    for (let i=0; i<handSize; i++) {
        hand.push(drawCardFromDeck(deck));
    }
    return hand;
}

const cardImages = {
    AceClubs: AceClubs,
    TwoClubs: TwoClubs,
    ThreeClubs: ThreeClubs,
    FourClubs: FourClubs,
    FiveClubs: FiveClubs,
    SixClubs:SixClubs,
    SevenClubs:SevenClubs,
    EightClubs:EightClubs,
    NineClubs:NineClubs,
    TenClubs:TenClubs,
    JackClubs:JackClubs,
    QueenClubs:QueenClubs,
    KingClubs:KingClubs,
    AceDiamonds:AceDiamonds,
    TwoDiamonds:TwoDiamonds,
    ThreeDiamonds:ThreeDiamonds,
    FourDiamonds:FourDiamonds,
    FiveDiamonds:FiveDiamonds,
    SixDiamonds:SixDiamonds,
    SevenDiamonds:SevenDiamonds,
    EightDiamonds:EightDiamonds,
    NineDiamonds:NineDiamonds,
    TenDiamonds:TenDiamonds,
    JackDiamonds:JackDiamonds,
    QueenDiamonds:QueenDiamonds,
    KingDiamonds:KingDiamonds,
    AceSpades:AceSpades,
    TwoSpades:TwoSpades,
    ThreeSpades:ThreeSpades,
    FourSpades:FourSpades,
    FiveSpades:FiveSpades,
    SixSpades:SixSpades,
    SevenSpades:SevenSpades,
    EightSpades:EightSpades,
    NineSpades:NineSpades,
    TenSpades:TenSpades,
    JackSpades:JackSpades,
    QueenSpades:QueenSpades,
    KingSpades:KingSpades,
    AceHearts:AceHearts,
    TwoHearts:TwoHearts,
    ThreeHearts:ThreeHearts,
    FourHearts:FourHearts,
    FiveHearts:FiveHearts,
    SixHearts:SixHearts,
    SevenHearts:SevenHearts,
    EightHearts:EightHearts,
    NineHearts:NineHearts,
    TenHearts:TenHearts,
    JackHearts:JackHearts,
    QueenHearts:QueenHearts,
    KingHearts:KingHearts
}

export default {
    create52CardDeck,
    drawCardFromDeck,
    drawAHandFromDeck,
    cardImages
}
