const { UserController } = require("../controllers/UserController");

const router = require("express").Router();

router.get("/", UserController.generalGetUser);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;