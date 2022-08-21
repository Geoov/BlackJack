import React, { useState, useEffect } from "react";
import "./GameCard.scss";
import cornerDecoration from "../../../src/assets/images/cornerDecoration.png";
import horizontallyDecoration from "../../../src/assets/images/horizontallyDecoration.png";

const GameCard = ({ index, suite, rank, show }) => {
  const [color, setColor] = useState("");
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    switch (suite) {
      case "hearts":
        setSymbol("&hearts;");
        setColor("#A96E89");
        break;
      case "diamonds":
        setSymbol("&diams;");
        setColor("#A96E89");
        break;
      case "clubs":
        setSymbol("&clubs;");
        setColor("#2F4858");
        break;
      case "spades":
        setSymbol("&spades;");
        setColor("#2F4858");
        break;
    }
  }, [suite]);

  return (
    <div className="outer-border">
      <div className="mid-border">
        <div className="inner-border">
          <img
            className="corner-decoration corner-left-top"
            src={cornerDecoration}
          ></img>
          <img
            className="corner-decoration corner-right-top"
            src={cornerDecoration}
          ></img>
          <img
            className="corner-decoration corner-right-bottom"
            src={cornerDecoration}
          ></img>
          <img
            className="corner-decoration corner-left-bottom"
            src={cornerDecoration}
          ></img>

          {show ? (
            <div
              className="game-card"
              style={{
                color: color,
              }}
            >
              <div className="up-section">
                <span>{show ? rank : "?"}</span>
                <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
              </div>
              <div className="middle-section">
                <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
              </div>
              <div className="down-section">
                <span>{show ? rank : "?"}</span>
                <span dangerouslySetInnerHTML={{ __html: `${symbol}` }} />
              </div>
            </div>
          ) : (
            <div className="game-card-hidden">
              <img
                className="horizontally-decoration horizontally-decoration-left"
                src={horizontallyDecoration}
              ></img>
              <img
                className="horizontally-decoration horizontally-decoration-right"
                src={horizontallyDecoration}
              ></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
