const { User } = require("../models/User");
 
class PagesController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();

            console.log(users);

            res.render("index", { users: users });

        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async getUserById(req, res){
        const { id } = req.params;
        try {
            const user = await User.getUserById(id);
            res.render("index", { users: user });
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static createUserPage(req, res) {
        res.render("create");
    }

    static updateUserPage(req, res) {
        res.render("update");
    }

    static deleteUserPage(req, res) {
        res.render("delete");
    }
}

module.exports = { PagesController };