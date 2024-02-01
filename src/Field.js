import { useState, useRef } from "react";
import './Field.css';
import Card from './Card.js';

function initializeCards () {
  const cards = [];
  const suits = ["♠", "♥", "◆", "♣"];
  const nums = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  for( var suit in suits ){
    for( var num in nums ){
      cards.push({"suit":suits[suit], "num":nums[num]});
    }
  }
  for (var fromIndex in cards){
    var toIndex = Math.floor(Math.random() * cards.length);
    var tmp = cards[toIndex];
    cards[toIndex] = cards[fromIndex];
    cards[fromIndex] = tmp;
  }

  return cards;
}

export default function Field () {
  const cards = useRef(initializeCards());
  const openedIndex = useRef(new Array());
  const closeFuncs = useRef(new Array());
  const clearFuncs = useRef(new Array());

  const Cards = [];
  for( var index in cards.current){
    Cards.push(<Card card={cards.current[index]} index={index} key={index} onClick={open} />)
  }

  return (
    <div className="field">
      {Cards}
    </div>
  )

  function open(index, close, clear){
    if (openedIndex.current.length > 1){
      cardCheck();
      return false;
    }
    openedIndex.current.push(index);
    closeFuncs.current.push(close);
    clearFuncs.current.push(clear);
    return true;
  }
  function Wait( sec ) {
    let startTime = performance.now();
    while (performance.now() - startTime < sec * 1000) {
    }
  }
  function reset(){
    closeFuncs.current.forEach((func) => func());
    openedIndex.current = [];
    closeFuncs.current = [];
    clearFuncs.current = [];
  }

  function cardCheck() {
    const card1 = cards.current[openedIndex.current[0]];
    const card2 = cards.current[openedIndex.current[1]];
    if( card1.num === card2.num ){
      clearFuncs.current.forEach((func) => func());
    }
    Wait(2);
    reset();
    return false;
  }
}
