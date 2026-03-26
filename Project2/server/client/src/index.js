const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const rooms = {};
const users = {};

const COLORS = ["#F87171","#FB923C","#FBBF24","#34D399","#60A5FA","#A78BFA","#F472B6","#22D3EE"];
let colorIndex = 0;

io.on("connection", (socket) => {
  console.log("✅ Connected:", socket.id);

  socket.on("join_room", ({ room, username }) => {
    socket.join(room);

    const color = COLORS[colorIndex % COLORS.length];
    colorIndex++;

    users[socket.id] = { room, username, color };
    if (!rooms[room]) rooms[room] = "";

    // Send existing code to new joiner
    socket.emit("receive_code", rooms[room]);

    // Send this user their color
    socket.emit("your_color", color);

    // ✅ Tell OTHER users someone joined (exclude sender)
    socket.to(room).emit("user_joined", username);
    console.log(`📢 Emitted user_joined: ${username} to room: ${room}`);

    // ✅ Send updated user list to EVERYONE including new joiner
    const roomUsers = getRoomUsers(room);
    console.log(`👥 Room users now:`, roomUsers);
    io.to(room).emit("room_users", roomUsers);
  });

  socket.on("send_code", (code, room) => {
    rooms[room] = code;
    socket.to(room).emit("receive_code", code);
  });

  socket.on("cursor_move", ({ room, line, column }) => {
    const user = users[socket.id];
    if (!user) return;
    socket.to(room).emit("cursor_update", {
      socketId: socket.id,
      username: user.username,
      color: user.color,
      line,
      column,
    });
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const { room, username } = user;
      delete users[socket.id];
      socket.to(room).emit("user_left", username);
      socket.to(room).emit("cursor_remove", socket.id);
      io.to(room).emit("room_users", getRoomUsers(room));
      console.log(`❌ ${username} left room: ${room}`);
    }
  });
});

function getRoomUsers(room) {
  return Object.values(users)
    .filter((u) => u.room === room)
    .map((u) => ({ username: u.username, color: u.color }));
}

server.listen(5000, () => console.log("🚀 Server on port 5000"));
```

After restarting the server, watch the **server terminal** — when the second tab joins you should see:
```
📢 Emitted user_joined: shashi to room: abc
👥 Room users now: [ { username: 'user1', color: '...' }, { username: 'shashi', color: '...' } ]