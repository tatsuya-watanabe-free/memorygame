import { useState } from "react";
import './Card.css';

export default function Card({index, card, onClick}) {

  const [open, setOpen] = useState(false);
  const [clear, setClear] = useState(false);

  function Open() {
    if( open ){ return false; }
      setOpen(true);
    if (onClick(index, Close, Clear)){
      console.log("setOpen");
    }
  }

  function Close() {
    setOpen(false);
  }

  function Clear() {
    setClear(true);
  }

  return (
    <div className={"Card" + (open ? " Card-front" : " Card-back") + (clear ? " clear" : "")} onClick={Open}>
      <p>{open ? card.suit + " " + card.num: ""}</p>
    </div>
  );
}
