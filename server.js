require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const io = new Server(server, {
  connectionStateRecovery: {},
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("server running at http://localhost:"+PORT);
});

io.on("connection", (socket) => {

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});
