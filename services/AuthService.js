const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/User');
const bcrypt = require("bcrypt");

class AuthService {
    static async login(name, password) {
        try {
            const user = await UserModel.getUserOrUsers({ name });

            if (user && (await AuthService.checkPassword(password, user[0].password))) {
                // Passwords match, generate and return a token
                const token = AuthService.generateToken(user);
                return token;
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            throw error;
        }
    }

    static async register(name, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.createUser({ name, password: hashedPassword });
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async checkPassword(candidatePassword, hashedPassword) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    static generateToken(user) {
        // Generate a JWT token with user data
        const token = jwt.sign({ userId: user[0].id, username: user[0].name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}

module.exports = { AuthService };