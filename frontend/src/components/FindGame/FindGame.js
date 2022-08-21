import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import "./FindGame.scss";
import { Button } from "react-bootstrap";

function FindGame({ onJoinedGame }) {
  const socket = useContext(SocketContext);

  const [nickName, setNickName] = useState("");
  const [gameCode, setGameCode] = useState("");

  const handleNickNameInputChange = (event) => {
    event.persist();
    setNickName(event.target.value);
  };

  const handleGameCodeInputChange = (event) => {
    event.persist();
    setGameCode(event.target.value);
  };

  useEffect(() => {
    socket.on("createdGame", (data) => {
      onJoinedGame(data);
    });
  }, []);

  useEffect(() => {
    socket.on("joinedGame", (data) => {
      onJoinedGame(data);
    });
  }, []);

  const joinGame = async () => {
    if (!nickName || !gameCode) console.error('missing nickName or gameCode');

    socket.emit("joinGame", { nickName, gameCode });
  };

  const createGame = () => {
    if (!nickName) console.error('missing nickName');

    socket.emit("createGame", { nickName });
  };

  useEffect(() => {
    socket.on("universalError", (data) => {
      alert(data.message);
    });
  }, []);

  return (
    <div className="find-game-page-wrapper">
      <div className="card-wrapper">
        <div className="inputs-wrapper">
          <label>Nick Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={nickName}
            onChange={handleNickNameInputChange}
          ></input>
          <div className="separator py-3"></div>
          <label>Game Code</label>
          <br />
          <input
            type="text"
            name="gameCode"
            value={gameCode}
            onChange={handleGameCodeInputChange}
          ></input>
        </div>
        <div className="buttons-wrapper">
          <Button variant="primary" onClick={joinGame}>
            Join Game
          </Button>
          <div className="separator py-3"></div>
          <Button variant="danger" onClick={createGame}>
            Create Game
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FindGame;
