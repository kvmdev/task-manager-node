const crypto = require("crypto");
const algorithm = 'aes-128-cbc';
const bcrypt = require("bcrypt");

let encrypt = (id) => {
    const key = crypto.randomBytes(16);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encryptedPassword = Buffer.concat([cipher.update(id), cipher.final()]);
    return {
        iv: iv.toString("hex"),
        encrypted: encryptedPassword.toString("hex")
    }
}

let decrypt = (encryptedId) => {
    const encryptediv = Buffer.from(id.iv, "hex");
    const encrypted = Buffer.from(id.encrypted, "hex");
    const decryptedPassword = crypto.createDecipheriv(algorithm, key, encryptediv);

    return Buffer.concat([decryptedPassword.update(encrypted), decryptedPassword.final()]).toString();
}

module.exports = { encrypt, decrypt };