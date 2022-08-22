import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";
import horizontallyDecoration from "../../../src/assets/images/horizontallyDecoration.png";
import CountDownSound from "../../../src/assets/audio/countdown.wav";
import useNotification from "../Notification/useNotification";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Lobby = ({ currentGameCode, onStartedGame }) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [countdown, setCountdown] = useState("");
  const [countdownAudio] = useState(new Audio(CountDownSound));
  const [msg, sendNotification] = useNotification();

  useEffect(() => {
    if (!currentGameCode) return currentGameCode;
    socket.emit("getUsers", { gameCode: currentGameCode });
  }, [currentGameCode, socket]);

  useEffect(() => {
    socket.on("gameUsers", (data) => {
      if (!equals(users, data._gameUsers)) {
        setUsers(data._gameUsers);
      }
    });
  }, [users]);

  const toggleReadyState = (index, isReady) => {
    socket.emit("toggleReadyState", {
      id: users[index]._id,
      gameCode: currentGameCode,
      readyState: !isReady,
    });
  };

  useEffect(() => {
    let allPlayersReady = true;
    users.find((user) => {
      if (user._ready === false) {
        allPlayersReady = false;
        return;
      }
    });

    if (allPlayersReady && users.length > 1) startGame();
  }, [users]);

  const startGame = () => {
    modifyTimer("3");
  };

  const modifyTimer = (countdown) => {
    setCountdown(countdown);
    countdownAudio.play();

    if (countdown === "START!") {
      setTimeout(() => onStartedGame(), 1000);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => modifyTimer(parseInt(countdown, 10) - 1), 1000);
    } else if (countdown === 0) {
      setTimeout(() => modifyTimer("START!"), 1000);
    }
  }, [countdown]);

  useEffect(() => {
    socket.on("universalError", (data) => {
      sendNotification({
        msg: data.message,
      });
    });
  }, [socket]);

  return (
    <div className="lobby-page-wrapper">
      <div className="mid-border">
        <div className="inner-border">
          <img
            className="horizontally-decoration horizontally-decoration-top"
            src={horizontallyDecoration}
          ></img>
          <img
            className="horizontally-decoration horizontally-decoration-bottom"
            src={horizontallyDecoration}
          ></img>

          <div className="lobby-content-wrapper">
            {(countdown || countdown >= 0) && (
              <div className="full-screen-seconds">
                <h1>{countdown}</h1>
              </div>
            )}
            <div className="game-code-wrapper">
              <p>Gamecode: {currentGameCode}</p>
            </div>

            <div className="users-card-wrapper">
              {users.map((user, index) => {
                return (
                  <UserCard
                    key={user._id}
                    id={user._id}
                    index={index}
                    name={user._nickName}
                    isReady={user._ready}
                    updateIsReady={toggleReadyState}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
