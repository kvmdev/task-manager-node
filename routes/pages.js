const router = require("express").Router();
const { PagesController } = require("../controllers/PagesController");

router.get("/", PagesController.getAllTasks);
router.get("/update", PagesController.updateUserPage);
router.get("/create", PagesController.createUserPage);
router.get("/login", PagesController.loginPage);
router.get("/logout", PagesController.logout);
router.get("/register", PagesController.registerPage);
router.get("/task", PagesController.createTaskPage);
router.get("/edit/:id", PagesController.editTaskForId);

module.exports = router;