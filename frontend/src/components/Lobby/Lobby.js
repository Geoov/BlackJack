import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import "./Lobby.scss";

const Lobby = () => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [canStart, setCanStart] = useState(false);

  return (
    <div className="lobby-page-wrapper">
      <div className="users-wrapper">
        
      </div>
    </div>
  )

}

export default Lobby;
