import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";
import horizontallyDecoration from "../../../src/assets/images/horizontallyDecoration.png";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Lobby = ({ currentGameCode, onStartedGame }) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!currentGameCode) currentGameCode = "test";
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
    onStartedGame();
  };

  useEffect(() => {
    socket.on("universalError", (data) => {
      console.error(data.message);
    });
  }, []);

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
