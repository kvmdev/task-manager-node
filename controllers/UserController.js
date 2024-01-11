const { User } = require("../models/User");

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();

            if (users.length > 0) {
                res.status(200).json(users);
            } else {
                res.status(404).send("No users found");
            }

        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.getUserById(id);
            if (user.length > 0) {
                res.status(200).json(user);
            } else {
                res.status(404).send("User not found");
            }
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async generalGetUser(req, res) {
        const { name } = req.query;
        /* console.log(name); */
        try {
            const user = await User.generalGetUser({ name });
            if (user.length > 0) {
                console.log(JSON.stringify(user));
                res.status(200).json(user);
            } else {
                res.status(404).send("Not found");
            }
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async createUser(req, res) {
        try {
            const { name, password } = req.body;
            const user = await User.createUser({ name, password });
            if (user.affectedRows > 0) {
                res.status(201).json(user);
            } else {
                res.status(404).send("User not created");
            }
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async updateUser(req, res) {
        const { id, name, password } = req.body;
        try {
            const user = await User.updateUser({ id, name, password });
            if (user.affectedRows > 0) {
                res.status(200).send("User updated");
            } else {
                res.status(404).send("User not updated");
            }
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.body;
        try {
            const user = await User.deleteUser(id);
            if (user.affectedRows > 0) {
                res.status(200).send("User deleted");
            } else {
                res.status(404).send("User not deleted");
            }
        } catch(e) {
            res.status(500).send("Internal server error");
        }
    }
}

module.exports = { UserController };