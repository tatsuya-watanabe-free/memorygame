import React from "react";
import './Card.css';

class Card extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      "index": props.index,
      "suit": props.card.suit,
      "num": props.card.num,
      "open": false,
      "clear": false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clear = this.clear.bind(this);
  }

  open() {
    if( this.state.open ){ return false; }
    if (this.props.onClick(this.state.index, this.close, this.clear)){
      this.setState({"open": true});
    }
  }

  close() {
    this.setState({"open": false});
  }

  clear() {
    this.setState({"clear": true});
  }

  render() {
    return (
      <div className={"Card" + (this.state.open ? " Card-front" : " Card-back") + (this.state.clear ? " clear" : "")} onClick={this.open}>
        <p>{this.state.open ? this.state.suit + " " + this.state.num: ""}</p>
      </div>
    );
  }
}

export default Card;
