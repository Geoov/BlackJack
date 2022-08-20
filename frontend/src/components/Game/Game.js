import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import { useSelector } from "react-redux";
import "./Game.scss";
import GameCard from "../GameCard/GameCard";

function Game() {
  const socket = useContext(SocketContext);
  const reduxUserId = useSelector((state) => state.user.userId);
  const [cards, setCards] = useState([]);

  const drawCard = (id) => {
    let tempCards = [
      { _suite: "clubs", _rank: "3" },
      { _suite: "diamonds", _rank: "10" },
      { _suite: "hearts", _rank: "A" },
      { _suite: "spades", _rank: "Q" },
    ];
    setCards(tempCards);
  };

  const stopDrawing = (id) => {
    console.log("stop drawing");
  };

  return (
    <div className="game-page-wrapper">
      <div id="player-one-board" className="player-board-wrapper">
        {cards.map((card, index) => {
          return (
            <GameCard
              key={index}
              index={index}
              suite={card._suite}
              rank={card._rank}
              show={true}
            />
          );
        })}
      </div>

      <div className="draw-card-wrapper">
        <button onClick={() => drawCard("b3")}>Draw card</button>
        <button onClick={() => stopDrawing("b3")}>Stop drawing</button>
      </div>

      <div id="player-two-board" className="player-board-wrapper"></div>
    </div>
  );
}

export default Game;
