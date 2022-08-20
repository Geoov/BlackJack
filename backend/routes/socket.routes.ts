import { v4 as uuidv4 } from 'uuid';
import { Game } from '../classes/Game';
import { User } from '../classes/User';

export function socketRoutes(app, io) {

  var game = new Game();


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
        gameUsers: game.users,
      });
    });

    socket.on("toggleReadyState", async (data) => {
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
        gameUsers: game.users,
      });
    });



    function universalError(message) {
      socket.emit("universalError", { message });
    }
  });


}

