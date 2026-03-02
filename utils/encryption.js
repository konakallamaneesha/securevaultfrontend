const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// Generate key from user password
function generateKey(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
}

// Encrypt text
function encrypt(text, password) {
    const iv = crypto.randomBytes(16);
    const salt = crypto.randomBytes(16);

    const key = generateKey(password, salt);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return {
        encryptedData: encrypted,
        iv: iv.toString("hex"),
        salt: salt.toString("hex")
    };
}

// Decrypt text
function decrypt(encryptedData, password, ivHex, saltHex) {
    const iv = Buffer.from(ivHex, "hex");
    const salt = Buffer.from(saltHex, "hex");

    const key = generateKey(password, salt);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

module.exports = { encrypt, decrypt };