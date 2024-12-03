const express = require("express");
const Room = require("../models/Rooms");
const router = express.Router();
const auth = require("../middleware/auth");


  router.get("/", auth, async (req, res) => {
    const { id } = req.user;
    try {
      const rooms = await Room.find({ users: id });
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rooms." });
      console.error(error);
    }
  });
  
  module.exports = router;