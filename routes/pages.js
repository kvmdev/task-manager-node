const { UserController } = require("../controllers/UserController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const users = await UserController.getAllUsers();
        if(users) {
            res.render("index", { users });
        } else {
            res.render("index", { users: [] });
        }
    } catch(e) {
        res.status(500).send("Internal server error");
    }
});

module.exports = router;