import React, { useState, useEffect } from "react";
import "./GameCard.scss";

const GameCard = ({ index, suite, rank, show }) => {
  const [color, setColor] = useState("");
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    switch (suite) {
      case "hearts":
        console.log("hearts");
        setSymbol("&hearts;");
        setColor("red");
        break;
      case "diamonds":
        console.log("diamonds");
        setSymbol("&diams;");
        setColor("red");
        break;
      case "clubs":
        console.log("clubs");
        setSymbol("&clubs;");
        setColor("black");
        break;
      case "spades":
        console.log("spades");
        setSymbol("&spades;");
        setColor("black");
        break;
    }
  }, [suite]);

  return (
    <div
      className={`${show ? "game-card" : "game-card-hidden"}`}
      style={{
        color: color,
        border: show ? "3px solid " + color : "3px solid #8a8a8a",
      }}
    >
      <div className="up-section">
        <span>{rank}</span>
        <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
      </div>
      <div className="middle-section">
        <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
      </div>
      <div className="down-section">
        <span>{rank}</span>
        <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
      </div>
    </div>
  );
};

export default GameCard;
