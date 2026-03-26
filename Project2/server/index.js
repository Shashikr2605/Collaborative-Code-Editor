const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let code = "";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_code", (newCode) => {
    code = newCode;
    socket.broadcast.emit("receive_code", code);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});