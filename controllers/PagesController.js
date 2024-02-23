const Task = require("../models/Task");
const User = require("../models/User");

class PagesController {

    static async getAllUsers(req, res) {
        try {
            const users = await User.find();
            users.then(users => {
                res.render("users", { users: users, isAuthenticated: req.session.isAuthenticated });
            }).catch(err => {
                throw err;
            });
        } catch (e) {
            console.error("Error:", e);
            res.status(500).send("Internal server error");
        }
    }

    static async getAllTasks(req, res) {
        try {

            if (req.session.isAuthenticated) {
                console.log(req.session.user.id);
                const tasks = await Task.find({ user_id: req.session.user.id });
                res.render("index", { tasks: tasks, isAuthenticated: req.session.isAuthenticated });
            } else {
                res.redirect("/login");
            }
        } catch (e) {
            console.error("Error:", e);
            res.status(500).send("Internal server error");
        }
    }



    static async logout(req, res) {
        try {
            req.session.destroy();
            res.json({ message: "Session destroyed succesfully" });
        } catch (e) {
            res.status(500).json({ message: "Error destroying session" });
        }
    }

    static createUserPage(req, res) {
        if (req.session.isAuthenticated) {
            res.render("create");
        } else {
            res.status(404).send("Not logged");
        }
    }

    static updateUserPage(req, res) {
        res.render("update");
    }

    static loginPage(req, res) {
        res.render("login", { isAuthenticated: req.session.isAuthenticated });
    }

    static registerPage(req, res) {
        res.render("register", { isAuthenticated: req.session.isAuthenticated });
    }

    static createTaskPage(req, res) {
        if (req.session.isAuthenticated) {
            res.render("create-task", { isAuthenticated: req.session.isAuthenticated });
        } else {
            res.redirect("/login");
        }
    }
    static editTask(req, res) {
        try {

            res.render("edit", { title, note, isAuthenticated: req.session.isAuthenticated });
        } catch (e) {
            res.status(500).send("Internal server error");
        }
    }

    static async editTaskForId(req, res) {
        try {
            const { id } = req.params;
            if (req.session.isAuthenticated) {
                const task = await Task.findById(id);
                
                if(task.user_id == req.session.user.id) {
                    res.render("edit", { isAuthenticated: req.session.isAuthenticated, title: task.title, note: task.note });
                } else {
                    res.status(404).send("Invalid credentials");
                }


            } else {
                res.redirect("/login");
            }
        } catch (e) {
            console.error("Error:", e);
            res.status(500).send("Internal server error");
        }
    }
}

module.exports = { PagesController };