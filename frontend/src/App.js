import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./App.scss";
import { API_URL } from "./config/config";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(API_URL);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;
