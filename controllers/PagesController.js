const { User } = require("../models/User");

class PagesController {
    static async getAllUsers(req, res) {
        try {
            console.log("Route - isAuthenticated:", req.session.isAuthenticated);

            if (req.session.isAuthenticated) {
                const users = await User.getAllUsers();
                res.render("index", { users: users, isAuthenticated: req.session.isAuthenticated });
            } else {
                res.render("index", { users: [], isAuthenticated: req.session.isAuthenticated });
            }
        } catch (e) {
            console.error("Error:", e);
            res.status(500).send("Internal server error");
        }
    }

    
    static async logout(req, res) {
        try {
            req.session.destroy();
            res.json({message: "Session destroyed succesfully"});
        } catch(e) {
            res.status(500).json({ message: "Error destroying session"});
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

    static loginPage(req, res) {
        res.render("login", { isAuthenticated: req.session.isAuthenticated });
    }

    static registerPage(req, res) {
        res.render("register", { isAuthenticated: req.session.isAuthenticated });
    }
}

module.exports = { PagesController };