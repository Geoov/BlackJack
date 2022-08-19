
export function socketRoutes(app, io) {


  let interval;

  io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  const getApiAndEmit = (socket) => {
    const response = new Date();
    socket.emit("FromAPI", response);
  };

}




// app.get("/", (req, res) => {
//   let suites: Suite[] = ["clubs", "diamonds", "hearts", "spades"];
//   let rank: Rank[] = [
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//     "J",
//     "Q",
//     "K",
//     "A",
//   ];

//   let deck: DeckOfCards = new DeckOfCards(suites, rank);
//   deck.shuffleDeck();
//   console.log(deck.getDeck());
//   console.log(deck.drawCard());
//   console.log(deck.getDeck());


//   res.send("hello world");
// });