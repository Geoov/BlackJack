import { v4 as uuidv4 } from 'uuid';
import { Card } from '../classes/Card';
import { Game } from '../classes/Game';
import { User } from '../classes/User';

export function socketRoutes(app, io) {

  var game = new Game('test');


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

      console.log('created');

      let user: User = new User(uuidv4().substring(0, 2), data.nickName);
      let gameCode = uuidv4().substring(0, 4);
      game = new Game(gameCode);
      game.users.push(user);

      // I decided to not send the game because
      // I will send it when the game will start
      // and both players will join

      socket.emit('createdGame', { _gameCode: gameCode, _user: user })
    })

    socket.on('joinGame', (data) => {
      if (!data.nickName || !data.gameCode) {
        universalError("NickName or GameCode is null");
        return;
      }

      if (!(game.gameCode == data.gameCode)) {
        universalError("The game hasn't been created");
        return;
      }

      if (game.users.length == 2) {
        universalError("The maximum number of players joined");
        return;
      }

      console.log('joined');

      let user = new User(uuidv4().substring(0, 2), data.nickName);
      game.users.push(user);

      socket.emit('joinedGame', { _gameCode: game.gameCode, _user: user })
    });

    socket.on("getUsers", (data) => {
      if (!data.gameCode) {
        universalError("GameCode doesn't exist");
        return;
      }

      if (!(game.gameCode == data.gameCode)) {
        universalError("The game hasn't been created");
        return;
      }

      io.emit("gameUsers", {
        _gameUsers: game.users,
      });
    });

    socket.on("toggleReadyState", (data) => {
      if (!data.id) {
        universalError("This user doesn't exists");
        return;
      }

      if (!(game.gameCode == data.gameCode)) {
        universalError("The game hasn't been created");
        return;
      }

      let user = game.users.find((u) => u.id === data.id);

      if (!user) {
        universalError("This user doesn't exists in the current game");
        return;
      }

      user.ready = data.readyState;

      io.emit("gameUsers", {
        _gameUsers: game.users,
      });
    });

    socket.on("startGame", (data) => {
      if (!(game.gameCode == data.gameCode)) {
        universalError("The game hasn't been created");

        return;
      }

      game.users = [];

      let user1 = new User('tt', 'test1');
      user1.ready = true;
      let user2 = new User('qq', 'test2');
      user2.ready = true;

      game.users.push(user1);
      game.users.push(user2);

      io.emit("gameUsers", {
        _gameUsers: game.users
      })

    })

    socket.on("drawCard", (data) => {
      if (!data.id) {
        universalError("This user doesn't exists");
        return;
      }

      let user = game.users.find((u) => u.id === data.id);

      if (!user) {
        universalError("This user doesn't exists in the current game");
        return;
      }

      if (user.finished === true) {
        socket.emit('finished');
        return;
      }

      game.deckOfCards.shuffleDeck();
      let card = game.deckOfCards.drawCard();

      if (!card) {
        universalError("There was a problem while trying to draw a card");
        return;
      }

      user.cards.push(card);
      user.computeScore();

      if (user.score >= 21) {
        user.finished = true;
      }

      io.emit("gameUsers", {
        _gameUsers: game.users
      })
    })

    socket.on("stopDrawing", (data) => {
      if (!data.id) {
        universalError("This user doesn't exists");
        return;
      }

      let user = game.users.find((u) => u.id === data.id);

      if (!user) {
        universalError("This user doesn't exists in the current game");
        return;
      }

      user.finished = true;

      io.emit("gameUsers", {
        _gameUsers: game.users
      })
    })


    function universalError(message) {
      socket.emit("universalError", { message });
    }
  });


}

