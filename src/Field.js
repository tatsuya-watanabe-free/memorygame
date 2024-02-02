import { useState, useRef } from "react";
import './Field.css';
import Card from './Card.js';

function initializeCards () {
  const cards = [];

  for( let suit=0 ; suit < 4; suit++ ){
    for( let num=0 ; num < 13; num++ ){
      cards.push({
        suit: suit,
        num: num,
        status: "back"
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
  const [cards, setCards] = useState(initializeCards);
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
    if (cards[index].status !== "back") { return false;}
    waiting.current = true;
    openedIndex.current.push(index);
    let nextCards = cards.slice();
    nextCards[index]["status"] = "open";
    setCards(nextCards);
    if (openedIndex.current.length > 1){
      setTimeout(cardCheck, 500);
      return false;
    }
    waiting.current = false;
    return true;
  }

  function cardCheck() {
    let card1Index = openedIndex.current[0];
    let card2Index = openedIndex.current[1];
    const card1 = cards[card1Index];
    const card2 = cards[card2Index];
    let nextCards = cards.slice();
    if( card1.num === card2.num ){
      card1.status = "clear";
      card2.status = "clear";
    }else{
      card1.status = "back";
      card2.status = "back";
    }
    nextCards[card1Index] = card1;
    nextCards[card2Index] = card2;
    setCards(nextCards);
    waiting.current = false;
    openedIndex.current = [];
    return false;
  }
}
