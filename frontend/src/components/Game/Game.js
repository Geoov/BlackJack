import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import { useSelector } from "react-redux";
import "./Game.scss";
import GameCard from "../GameCard/GameCard";
import Button from "@mui/material/Button";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function Game() {
  const socket = useContext(SocketContext);
  const reduxGameCode = useSelector((state) => state.game.gameId) || "test";
  const reduxUserId = useSelector((state) => state.user.userId) || "tt";
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrenUserIndex] = useState(-1);

  useEffect(() => {
    socket.emit("startGame", {
      gameCode: reduxGameCode,
    });
  }, []);

  useEffect(() => {
    socket.on("gameUsers", (data) => {
      if (!equals(users, data._gameUsers)) {
        setUsers(data._gameUsers);
      }
    });
    setCurrenUserIndex(users.findIndex((user) => user._id === reduxUserId));
  }, [users]);

  const drawCard = (id) => {
    socket.emit("drawCard", {
      id,
    });
  };

  const stopDrawing = (id) => {
    socket.emit("stopDrawing", {
      id,
    });
  };

  useEffect(() => {
    socket.on("universalError", (data) => {
      console.error(data.message);
    });
  }, []);

  useEffect(() => {
    socket.on("finished", () => {
      console.error("You can't draw any more cards");
    });
  });

  return (
    <div className="game-page-wrapper">
      <div id="player-one-board" className="player-board-wrapper">
        {users[0] &&
          users[0]._cards &&
          users[0]._cards.map((card, index) => {
            return (
              <GameCard
                key={index}
                index={index}
                suite={card._suite}
                rank={card._rank}
                show={
                  users[0]._score === 21 ||
                  (users[0]._finished && users[1]._finished) ||
                  users[0]._id === reduxUserId ||
                  card._rank === "A"
                }
              />
            );
          })}
      </div>

      <div className="draw-card-wrapper">
        <Button
          variant="contained"
          color="primary"
          onClick={() => drawCard(reduxUserId)}
        >
          Draw card
        </Button>

        <div className="text-wrapper">
          {currentUserIndex !== -1 && (
            <>
              <p>Score: {users[currentUserIndex]._score}</p>
              <div className="player-interaction">
                <p>Choose</p>
              </div>
              <p>
                Status:{" "}
                {users[currentUserIndex]._finished === false
                  ? "Playing"
                  : "Finished"}
              </p>
            </>
          )}
        </div>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => stopDrawing(reduxUserId)}
        >
          Stop drawing
        </Button>
      </div>

      <div id="player-two-board" className="player-board-wrapper">
        {users[1] &&
          users[1]._cards &&
          users[1]._cards.map((card, index) => {
            return (
              <GameCard
                key={index}
                index={index}
                suite={card._suite}
                rank={card._rank}
                show={
                  users[1]._score === 21 ||
                  (users[0]._finished && users[1]._finished) ||
                  users[1]._id === reduxUserId ||
                  card._rank === "A"
                }
              />
            );
          })}
      </div>
    </div>
  );
}

export default Game;
