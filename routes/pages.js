const router = require("express").Router();
const { PagesController } = require("../controllers/PagesController");

router.get("/", PagesController.getAllUsers);
router.get("/update", PagesController.updateUserPage);
router.get("/create", PagesController.createUserPage);
router.get("/delete", PagesController.deleteUserPage); 
router.get("/login", PagesController.loginPage);
router.get("/logout", PagesController.logout);
router.get("/register", PagesController.registerPage);

module.exports = router;