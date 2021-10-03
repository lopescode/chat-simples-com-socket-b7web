import express from "express";
import dotenv from "dotenv";
import path from "path";

const socketIO = require("socket.io");

dotenv.config();

const port = process.env.PORT;

const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")))

server.listen(port)
console.log(`Servidor rodando na porta ${port}`);

io.on('connection', (socket) => {
    console.log("Conexão estabelecida...");
    
})