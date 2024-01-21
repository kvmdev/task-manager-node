const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "6294862";

function createToken(payload) {
    const token = jwt.sign(payload, secret, {expiresIn: "2h"});
    return token;
}

function authenticateToken(req, res, next) {
    const authorization = req.header("Authorization");
    

    if(!authorization) {
        req.session.isAuthenticated = false;
        return res.status(401).send("No token found");
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, secret, (err, user)=> {
        if(err) {
            req.session.isAuthenticated = false;
            return res.status(401).send("Invalid token");
        }
            req.session.isAuthenticated = true;
            req.session.user = user;
            next();
    });
}

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch(e) {
        throw e;
    }
}

async function comparePassword(plainPassword, hashedPassword) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch(e) {
        throw e;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    createToken,
    authenticateToken
};