const express = require("express");
const Password = require("../models/Password");
const auth = require("../middleware/authMiddleware");
const { encrypt, decrypt } = require("../utils/encryption");

const router = express.Router();

// Add password
router.post("/", auth, async (req, res) => {
    const { website, username, password, masterPassword } = req.body;

    const enc = encrypt(password, masterPassword);

    const newPass = new Password({
        userId: req.user.id,
        website,
        username,
        encryptedPassword: enc.encryptedData,
        iv: enc.iv,
        salt: enc.salt
    });

    await newPass.save();

    res.json({ message: "Saved" });
});

// Get passwords
router.post("/get", auth, async (req, res) => {
    const { masterPassword } = req.body;

    const data = await Password.find({ userId: req.user.id });

    const result = data.map(item => ({
        id: item._id,
        website: item.website,
        username: item.username,
        password: decrypt(
            item.encryptedPassword,
            masterPassword,
            item.iv,
            item.salt
        )
    }));

    res.json(result);
});

module.exports = router;