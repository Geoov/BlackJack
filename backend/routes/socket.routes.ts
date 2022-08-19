import { v4 as uuidv4 } from 'uuid';
import { Game } from '../classes/Game';
import { User } from '../classes/User';

export function socketRoutes(app, io) {

  var game = new Game();

  // TO REMOVE - testing routes
  app.get('/', (req, res) => {

    let user = new User(uuidv4().substring(0, 2), 'test');
    let gameCode = uuidv4().substring(0, 4);
    game = new Game(gameCode);
    game.users.push(user);

    console.log(game);
  })

  app.get('/1', (req, res) => {
    let user = new User('tt', 'test1');
    game.users.push(user);
    console.log(game);

  })

  app.get('/2', (req, res) => {
    let user = game.users.find((u) => u.id === 'tt');

    if (!user)
      return;

    user.ready = true;
    console.log(game);
  })


  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on('createGame', (data) => {
      if (!data.nickName) {
        universalError("NickName null");
        return;
      }

      let user: User = new User(uuidv4().substring(0, 2), data.nickName);
      let gameCode = uuidv4().substring(0, 4);
      game = new Game(gameCode);
      game.users.push(user);

      // I decided to not send the game because
      // I will send it when the game will start
      // and both players will join

      socket.emit('createdGame', { gameCode, user })
    })

    socket.on('joinGame', (data) => {
      if (!data.nickName || !data.gameCode) {
        universalError("NickName or GameCode is null");
        return;
      }

      let currentGame = game._gameCode == data.gameCode;
      if (!currentGame) {
        universalError("The game hasn't been created");
        return;
      }

      let user = new User(uuidv4().substring(0, 2), data.nickName);
      game.users.push(user);

      socket.emit('joinedGame', { game })
    });



    function universalError(message) {
      socket.emit("universalError", { message });
    }
  });


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