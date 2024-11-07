 require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const Messages = require("./models/Messages")
const app = express();
const server = createServer(app);
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const { availableParallelism } = require('node:os');
const cluster = require('node:cluster');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

// if (cluster.isPrimary) {
//   const numCPUs = availableParallelism();
//   // create one worker per available core
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork({
//       PORT: 3000 + i
//     });
//   }
  
//   // set up the adapter on the primary thread
//   return setupPrimary();
// }

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

io.on("connection", async (socket) => {

  socket.on('chat message', async (msg, id) => {
    let result;
    try {
      const message = new Messages({ content: msg, senderId: id });
      await message.save();
      result = await message.populate("senderId", ['username', 'gender'])
    } catch (e) {
      console.log(e)
      return;
    }
    io.emit('chat message', result);
  });

  if (!socket.recovered) {
    // if the connection state recovery was not successful
    try {
      const messages = await Messages.find({}).populate("senderId", ['username', 'gender'])
      messages.forEach((message) => {
        socket.emit('chat message', message);
      });
    } catch (e) {
      console.log(e)
      return;
    }
  }


});
