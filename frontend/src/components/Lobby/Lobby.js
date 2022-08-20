import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import "./Lobby.scss";
import UserCard from "../UserCard/UserCard";

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Lobby = ({ currentGameCode }) => {
  const socket = useContext(SocketContext);
  const reduxGameCode = useSelector((state) => state.game.gameId);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!currentGameCode) return;
    socket.emit("getUsers", { gameCode: currentGameCode });
  }, [currentGameCode, socket]);

  useEffect(() => {
    socket.on("gameUsers", (data) => {
      if (!equals(users, data.gameUsers)) {
        setUsers(data.gameUsers);
      }
    });
  }, [users]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const toggleReadyState = (index, isReady) => {
    console.log(users);
    socket.emit("toggleReadyState", {
      index,
      id: users[index]._id,
      gameCode: reduxGameCode,
      readyState: !isReady,
    });
  };

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
