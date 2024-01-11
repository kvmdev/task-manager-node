const router = require("express").Router();
const { PagesController } = require("../controllers/PagesController");

router.get("/", PagesController.getAllUsers);
router.get("/update", PagesController.updateUserPage);
router.get("/create", PagesController.createUserPage);
router.get("/delete", PagesController.deleteUserPage);
router.get("/:id", PagesController.getUserById);    

module.exports = router;