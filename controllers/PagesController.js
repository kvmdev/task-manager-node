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

    static createUserPage(req, res) {
        res.render("create");
    }

    static updateUserPage(req, res) {
        res.render("update");
    }

    static deleteUserPage(req, res) {
        res.render("delete");
    }

    static loginPage(req, res){
        res.render("login");
    }

    static registerPage(req, res) {
        res.render("register");
    }
}

module.exports = { PagesController };