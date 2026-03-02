const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });

    await user.save();

    res.json({ message: "User registered" });
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
        { id: user._id, email: user.email },
        "secretkey",
        { expiresIn: "1d" }
    );

    res.json({ token });
});

module.exports = router;