import React, { useState } from "react";
import { SocketContext, socket } from "./context/socket";
import "./App.scss";
import FindGame from "./components/FindGame/FindGame";
import Lobby from "./components/Lobby/Lobby";
import { useDispatch } from "react-redux";
import { setUserId, setUserScore } from "./features/userSlice";
import { setGameId } from "./features/gameSlice";

function App() {
  const dispatch = useDispatch();

  const [gameFound, setGameFound] = useState("");

  const handleFindGame = (data) => {
    setGameFound(data._gameCode);
    dispatch(setGameId(data._gameCode));
    dispatch(setUserId(data._user._id));
    dispatch(setUserScore(data._user._votes));
  };

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        {!gameFound ? (
          <FindGame onJoinedGame={handleFindGame}></FindGame>
        ) : (
          <Lobby currentGameCode={gameFound}></Lobby>
        )}
      </SocketContext.Provider>
    </div>
  );
}

export default App;
