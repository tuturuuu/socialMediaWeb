const { Server } = require("socket.io");
const Messages = require("./models/Messages");
const Room = require("./models/Rooms");

module.exports = (server) => {
  const io = new Server(server, {
    connectionStateRecovery: false,
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", async (socket) => {

    socket.on("chat message", async (msg, id, roomId) => {
      try {
        const message = new Messages({ content: msg, senderId: id, roomId });
        await message.save();

        const room = await Room.findById(roomId);
        if (!room) {
          console.log("Room not found");
          return;
        }

        room.messages.push(message._id);
        await room.save();

        const result = await message.populate("senderId", ["username", "gender"]);
        io.in(roomId).emit("chat message", result);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("join room", async (roomId) => {
      socket.join(roomId);

      try {
        const messages = await Messages.find({ roomId }).populate("senderId", ["username", "gender"]);
        socket.emit("chat init", messages);
      } catch (error) {
        console.log(error);
      }
    });

  });

  return io;
};

