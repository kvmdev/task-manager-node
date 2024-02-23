const { hashPassword, comparePassword, createToken } = require("../middlewares/authMiddleware");
const User = require("../models/User");

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.find();

            if (users.rows.length > 0) {
                res.status(200).json({users: users.rows});
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
            if (user.rows.length > 0) {
                res.status(200).json({user: user.rows});
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
            if (user.rows.length > 0) {
                console.log(JSON.stringify(user));
                res.status(200).json({user: user.rows});
            } else {
                res.status(404).send("Not found");
            }
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async createUser(req, res) {
        try {
            let { name, password } = req.body;
            password = await hashPassword(password);

            const user = new User({ name, password });

            const saved = await user.save();

            if (saved) {
                const data = { 
                    id: saved["_id"],
                    name: saved.name,
                    password: saved.password
                };
                const token = createToken(data);
                req.session.isAuthenticated = true;
                res.status(201).json(token);
            }
 
        } catch (e) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    static async updateUser(req, res) {
        const { id, name, password } = req.body;
        try {
            const user = await User.updateUser({ id, name, password });
            if (user.rowCount > 0) {
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
            if (user.rowCount > 0) {
                res.status(200).send("User deleted");
            } else {
                res.status(404).send("User not deleted");
            }
        } catch(e) {
            res.status(500).send("Internal server error");
        }
    }

    static async login(req, res) {
        try {
            const { name, password } = req.body;
            const user = await User.findOne({ name });
            
            if(user) {
                const isMatch = await comparePassword(password, user.password);

                    if(isMatch) {
                        
                        const userToToken = {
                            id: user["_id"],
                            name: user.name,
                            isAdmin: user.isAdmin
                        };
    
                        const token = createToken(userToToken);
    
                        req.session.isAuthenticated = true;
                        req.session.user = userToToken;
                        res.json({ token });

                    } else {
                        res.status(403).json({message: ""});
                    }

            } else {
                req.session.isAuthenticated = false;
                res.status(404).json({message: "User not found"});
            }
        } catch(e) {
            req.session.isAuthenticated = false;
            res.status(500).json({ message: "Internal server error" });
        }
    }

}

module.exports = { UserController };