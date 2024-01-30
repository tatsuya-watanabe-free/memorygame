import React from "react";
import './Field.css';
import Card from './Card.js';

class Field extends React.Component {
  constructor(props) {
    super(props);
    const suits = ["♠", "♥", "◆", "♣"];
    const nums = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const cards = [];

    for( var suit in suits ){
      for( var num in nums ){
        cards.push({"suit":suits[suit], "num":nums[num]});
      }
    }
    shuffle(cards);

    this.state = {
      cards: cards,
      openedNum: 0,
      openedIndex: [],
      closeFuncs: [],
      clearFuncs: []
    };
    this.open = this.open.bind(this);
    this.reset = this.reset.bind(this);
    this.cardCheck = this.cardCheck.bind(this);
  }
  open(index, close, clear){
    if (this.state.openedNum > 1){ return false; }
    this.state.openedIndex.push(index);
    this.state.closeFuncs.push(close);
    this.state.clearFuncs.push(clear);
    this.setState({
      "openedNum": this.state.openedNum + 1,
    });
   return true;
  }

  reset(){
    this.state.closeFuncs.forEach((func) => func());
    this.setState({
      "openedNum": 0,
      "openedIndex": [],
      "closeFuncs": [],
      "clearFuncs": []
    });
  }

  cardCheck() {
    if (this.state.openedNum > 1){
      const card1 = this.state.cards[this.state.openedIndex[0]];
      const card2 = this.state.cards[this.state.openedIndex[1]];
      if( card1.num === card2.num ){
        this.state.clearFuncs.forEach((func) => func());
      }
      this.reset();
      return false;
    }
  }

  render() {
    const cards = this.state.cards;
    const Cards = [];
    for( var index in cards){
      Cards.push(<Card card={cards[index]} index={index} key={index} onClick={this.open} />)
    }

    return (
      <div className="field" onClick={this.cardCheck}>
        {Cards}
      </div>
    )
  }
}
function shuffle(cards) {
  for (var fromIndex in cards){
    var toIndex = Math.floor(Math.random() * cards.length);
    var tmp = cards[toIndex];
    cards[toIndex] = cards[fromIndex];
    cards[fromIndex] = tmp;
  }
}

export default Field;
