import express from "express";
import dotenv from "dotenv";
import path from "path";

const socketIO = require("socket.io");

dotenv.config();

const port = process.env.PORT;

const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));

server.listen(port);
console.log(`Servidor rodando na porta ${port}`);

let connectedUsers: any = [];

io.on("connection", (socket: any) => {
  console.log("Conexão estabelecida...");

  socket.on("join-request", (username: any) => {
    socket.username = username;
    connectedUsers.push(username);
    console.log(connectedUsers);

    socket.emit("user-ok", connectedUsers);
    socket.broadcast.emit("list-update", {
      joined: username,
      list: connectedUsers,
    })
  });

  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter((u: any) => u != socket.username);
    console.log(connectedUsers);

    socket.broadcast.emit("list-update", {
      left: socket.username,
      list: connectedUsers,
    })
  })
});
