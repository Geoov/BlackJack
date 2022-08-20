import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Lobby = ({ currentGameCode, onStartedGame }) => {
  const socket = useContext(SocketContext);
  const reduxGameCode = useSelector((state) => state.game.gameId);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!currentGameCode) return;
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
      gameCode: reduxGameCode,
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
    // onStartedGame();
    socket.emit("startGame", {
      gameCode: reduxGameCode,
    });
  };

  useEffect(() => {
    socket.on("startedGame", (data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    socket.on("universalError", (data) => {
      alert(data.message);
    });
  }, []);

  return (
    <div className="lobby-page-wrapper">
      <div className="choose"></div>
      <h1>gamecode - {currentGameCode}</h1>
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
  );
};

export default Lobby;
