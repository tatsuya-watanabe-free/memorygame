import { useRef, useReducer } from "react";
import './Field.css';
import Card from './Card.js';

const CARD_ACTION = {
  OPEN: "open",
  CLOSE: "close",
  CLEAR: "clear"
}

const CARD_STATUS = {
  OPEN: "open",
  BACK: "back",
  CLEAR: "clear"
}

function initializeCards () {
  const cards = [];

  for( let suit=0 ; suit < 4; suit++ ){
    for( let num=0 ; num < 13; num++ ){
      cards.push({
        suit: suit,
        num: num,
        status: CARD_STATUS.BACK
      });
    }
  }
  return shuffle(cards);
}

function shuffle(cards) {
  for (var i=0; i<200; i++){
    var toIndex = Math.floor(Math.random() * cards.length);
    var tmp = cards[toIndex];
    var fromIndex = i % cards.length;
    cards[toIndex] = cards[fromIndex];
    cards[fromIndex] = tmp;
  }
  return cards;
}

export default function Field () {
  const [cards, dispatch] = useReducer(cardReducer, null, initializeCards);
  const openedIndex = useRef([]);
  const waiting = useRef(false);
  const Cards = [];
  for( var index in cards){
    Cards.push(<Card card={cards[index]} index={index} key={index} onClick={open} />)
  }

  return (
    <div className="field">
      {Cards}
    </div>
  )

  function open(index){
    if (waiting.current){ return false; }
    if (cards[index].status !== CARD_STATUS.BACK) { return false;}
    waiting.current = true;
    openedIndex.current.push(Number(index));
    dispatch({
      type: CARD_ACTION.OPEN,
      ids: [Number(index)]
    });
    if (openedIndex.current.length > 1){
      setTimeout(cardCheck, 500);
      return false;
    }
    waiting.current = false;
    return true;
  }

  function cardCheck() {
    let [card1Index, card2Index] = openedIndex.current;
    const card1 = cards[card1Index];
    const card2 = cards[card2Index];
    if( card1.num === card2.num ){
      dispatch({
        type: CARD_ACTION.CLEAR,
        ids: openedIndex.current
      });
    }else{
      dispatch({
        type: CARD_ACTION.CLOSE,
        ids: openedIndex.current
      });
    }
    waiting.current = false;
    openedIndex.current = [];
    return false;
  }

  function cardReducer(cards, action) {
    switch(action.type){
      case CARD_ACTION.OPEN:
        return cards.map((card, index) => {
          if(action.ids.includes(index)){
            card.status = CARD_STATUS.OPEN;
          }
          return card;
        });
      case CARD_ACTION.CLOSE:
        return cards.map((card, index) => {
          if(action.ids.includes(index)){
            card.status = CARD_STATUS.BACK;
          }
          return card;
        });
      case CARD_ACTION.CLEAR:
        return cards.map((card, index) => {
          if(action.ids.includes(index)){
            card.status = CARD_STATUS.CLEAR;
          }
          return card;
        });
      default:
        return cards;
    }
  }
}
