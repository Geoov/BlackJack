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
import { socketRoutes } from './routes/socket.routes';

socketRoutes(app, io);


server.listen(port, () => console.log(`Listening on port ${port}`));
