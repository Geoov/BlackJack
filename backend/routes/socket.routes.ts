// const { v4: uuidv4 } = require("uuid");

import { Rank, Suite } from "../helper/Card";
import { DeckOfCards } from "../helper/DeckOfCards";

export function socketRoutes(app, io) {

  //   io.on("connection", (socket) => {
  //     console.log("New client connected");

  //     socket.on("disconnect", () => {
  //       console.log("Client disconnected");
  //     });

  //     socket.on("createGame", (data) => {
  //       let uuid = uuidv4().substring(0, 4);
  //       let host = data.nickName;
  //       console.log("createdGame", data.nickName);

  //       socket.emit("gameCreated", uuid);
  //     });
  //   });

}

