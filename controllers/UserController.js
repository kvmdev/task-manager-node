const { UserModel: UserM } = require("../models/User");

class UserController {
    static async createUser(req, res) {
        const { name, password } = req.body;
        try {
            const user = await UserM.createUser({ name, password });
            if (user) {
                res.status(201).send("User created");
            } else {
                res.sendStatus(500).send("Internal server error");
            }
        } catch (e) {
            res.sendStatus(500).send("Internal server error");
        }
    }
    static async getUserOrUsers(req, res) {
        const { name } = req.query;
        try {
            const users = await UserM.getUserOrUsers({ name });
            if (users.length > 0) {
                res.status(200).json(users);
            } else {
                res.sendStatus(404).send("Not found");
            }
        } catch (e) {
            res.sendStatus(500).send("Internal server error");
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserM.getUserById({ id });
            if (user) {
                res.status(200).json(user);
            } else {
                res.sendStatus(404).send("Not found");
            }
        } catch (e) {
            res.sendStatus(500).send("Internal server error");
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { name, password } = req.body;
        try {
            const user = await UserM.updateUser({ id, name, password });
            if (user) {
                res.status(200).send("User updated");
            } else {
                res.sendStatus(404).send("Not found");
            }
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await UserM.deleteUser({ id });
            if( user ) {
                res.status(200).send("User deleted");
            } else {
                res.status(404).send("Not found");
            }
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }
}

module.exports = { UserController };