import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import "./FindGame.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import useNotification from "../Notification/useNotification";

function FindGame({ onJoinedGame }) {
  const socket = useContext(SocketContext);
  const [nickName, setNickName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [gameMode, setGameMode] = useState("default");
  const [msg, sendNotification] = useNotification();

  const handleNickNameInputChange = (event) => {
    event.persist();
    setNickName(event.target.value);
  };

  const handleGameCodeInputChange = (event) => {
    event.persist();
    setGameCode(event.target.value);
  };

  const changeGameMode = (event) => {
    setGameMode(event.target.value);
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
    if (!nickName || !gameCode) {
      sendNotification({
        msg: "NickName or GameCode is missing",
      });
    }

    socket.emit("joinGame", { nickName, gameCode });
  };

  const createGame = () => {
    if (!nickName) {
      sendNotification({
        msg: "NickName is missing",
      });
    }

    socket.emit("createGame", { nickName, gameMode });
  };

  useEffect(() => {
    socket.on("universalError", (data) => {
      sendNotification({
        msg: data.message,
      });
    });
  }, [socket]);

  return (
    <div className="find-game-page-wrapper">
      <div className="card-wrapper">
        <div className="inputs-wrapper">
          <TextField
            label="nickname"
            variant="standard"
            value={nickName}
            onChange={handleNickNameInputChange}
          />
          <div className="separator py-3"></div>
          <TextField
            label="gamecode"
            variant="standard"
            value={gameCode}
            onChange={handleGameCodeInputChange}
          />
          <FormControl
            id="material-select"
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel id="gamemode">gamemode</InputLabel>
            <Select value={gameMode} onChange={changeGameMode} label="gamemode">
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="lowBets">Low Bets</MenuItem>
              <MenuItem value="mediumBets">Medium Bets</MenuItem>
              <MenuItem value="blackjack">BlackJack</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="buttons-wrapper">
          <Button variant="contained" color="primary" onClick={joinGame}>
            Join Game
          </Button>
          <div className="separator py-3"></div>
          <Button variant="contained" color="secondary" onClick={createGame}>
            Create Game
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FindGame;
