const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

router.post("/register", async (req, res) => {
    const { username, email, password, age } = req.body;
    try{
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ username, email, password: hashedPassword, age });
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
        
    } catch(error){
        return res.status(500).json({ message: error.message });   
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await Users.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch(error){
        res.status(500).json({ message: error.message });
    }
})

// In read user
router.get('/profile', auth, async (req, res) => {
    const { id } = req.user;
    try {
        const user = await Users.findById(id);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
});

// Update user
router.put('/profile', auth, async (req, res) => {
    const { id } = req.user;
    const { username, age, gender, birthday, bio } = req.body;
    try{
        const user = await Users.findById(id);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        user.username = username;
        user.age = age;
        user.gender = gender;
        user.birthday = birthday;
        user.bio = bio;
        await user.save();
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
})

router.delete('/profile', auth, async (req, res) => {
    const { id } = req.user;
    try{
        const user = await Users.findById(id);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        await user.deleteOne();
        return res.status(200).json({ message: "Profile deleted successfully" });
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
})
  
module.exports = router;