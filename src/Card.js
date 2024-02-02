import './Card.css';

export default function Card({index, card, onClick}) {
  const suits = ["♠", "♣", "♥", "◆"];
  const nums = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  let cardInfo = [];
  let color;
  switch(card.suit) {
    case 0:
    case 1:
      color = "black";
      break;
    case 2:
    case 3:
      color = "red";
      break;
    default:
      break;
  }
  let keyBase = ""+card.suit+card.num;
  if (card.status === "open"){
    cardInfo.push(<div key={keyBase+"suit"}>{suits[card.suit]}</div>);
    cardInfo.push(<div key={keyBase+"num"}>{nums[card.num]}</div>);
    
  }
  return (
    <div className={"Card " + card.status + " " + color} onClick={() => onClick(index)}>
      {cardInfo}
    </div>
  );
}
