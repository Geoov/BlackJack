import React, { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../../context/socket";
import { useSelector } from "react-redux";
import "./Game.scss";
import GameCard from "../GameCard/GameCard";
import Button from "@mui/material/Button";
import BlackJackImage from "../../../src/assets/images/blackjackImage.png";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function Game() {
  const socket = useContext(SocketContext);
  const reduxGameCode = useSelector((state) => state.game.gameId);
  const reduxUserId = useSelector((state) => state.user.userId);
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrenUserIndex] = useState(-1);
  const [opacity, setOpacity] = useState(0);
  const [showFireAnimation, setShowFireAnimation] = useState(false);
  const [result, setResult] = useState("");
  const imageRef = useRef(null);

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

      if (
        data._gameUsers[0]._finished === true &&
        data._gameUsers[1]._finished === true
      ) {
        gameIsFinished();
      }

      if (data._blackjack) showBlackJack();
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
    socket.on("finishedDrawing", () => {
      console.error("You can't draw any more cards");
    });
  }, []);

  const gameIsFinished = () => {
    socket.emit("finishedGame");
  };

  const showBlackJack = () => {
    imageRef.current.style.display = "flex";

    if (opacity < 1) {
      setOpacity(opacity + 0.1);
    }

    if (opacity >= 1) {
      setTimeout(() => {
        setOpacity(0);
        imageRef.current.style.display = "none";
        setShowFireAnimation(true);
      }, 500);
    }
  };

  useEffect(() => {
    if (opacity >= 0.1) {
      setTimeout(() => showBlackJack(), 100);
    }
  }, [opacity]);

  useEffect(() => {
    socket.on("gameFinished", (data) => {
      switch (data._results) {
        case "bothLose":
          setResult("Both users LOST!!");
          break;
        case "bothWin":
          setResult("Both users WON!!");
          break;
        case "p1Win":
          setResult(
            data._users[0]._nickName + " WON!! - " + data._users[0]._score
          );
          break;
        case "p2Win":
          setResult(
            data._users[1]._nickName + " WON!! - " + data._users[1]._score
          );
          break;
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("universalError", (data) => {
      console.error(data.message);
    });
  }, []);

  return (
    <div className="game-page-wrapper">
      <div className="full-screen-animation">
        <img
          id="blackJackImage"
          src={BlackJackImage}
          ref={imageRef}
          style={{ opacity: opacity }}
        ></img>
      </div>
      {result && (
        <div className="full-screen-results">
          <h1>{result}</h1>
        </div>
      )}
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
                showFire={users[0]._score === 21 && showFireAnimation}
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
                showFire={users[1]._score === 21 && showFireAnimation}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Game;
