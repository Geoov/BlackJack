import React, { useState, useEffect } from "react";
import "./GameCard.scss";

const GameCard = ({ index, suite, rank, show }) => {
  const [color, setColor] = useState("");
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    switch (suite) {
      case "hearts":
        setSymbol("&hearts;");
        setColor("red");
        break;
      case "diamonds":
        setSymbol("&diams;");
        setColor("red");
        break;
      case "clubs":
        setSymbol("&clubs;");
        setColor("black");
        break;
      case "spades":
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
        <span>{show ? rank: '?'}</span>
        <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
      </div>
      <div className="middle-section">
        <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
      </div>
      <div className="down-section">
        <span>{show ? rank: '?'}</span>
        <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
      </div>
    </div>
  );
};

export default GameCard;
