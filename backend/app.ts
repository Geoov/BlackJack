import { Rank, Suite } from "./helper/Card";
import { DeckOfCards } from "./helper/DeckOfCards";

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

const io = socketIo(server, { cors: { origin: "*" } });
const socketRoutes = require("./routes/socket.routes");

app.get("/", (req, res) => {
  let suites: Suite[] = ["clubs", "diamonds", "hearts", "spades"];
  let rank: Rank[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  let deck: DeckOfCards = new DeckOfCards(suites, rank);
  deck.shuffleDeck();
  console.log(deck.getDeck());
  console.log(deck.drawCard());
  console.log(deck.getDeck());


  res.send("hello world");
});


server.listen(port, () => console.log(`Listening on port ${port}`));
