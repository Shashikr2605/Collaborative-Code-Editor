const rooms = require("./rooms");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);

      const code = rooms.getRoomCode(roomId);
      if (code) {
        socket.emit("receive_code", code);
      }
    });

    socket.on("send_code", ({ roomId, code }) => {
      rooms.setRoomCode(roomId, code);
      socket.to(roomId).emit("receive_code", code);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};