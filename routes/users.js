const router = require("express").Router();
const { UserController : UserC} = require("../controllers/UserController");

router.post("/", UserC.createUser);
router.get("/", UserC.getUserOrUsers);
router.get("/:id", UserC.getUserById);
router.put("/:id", UserC.updateUser);
router.delete("/:id", UserC.deleteUser);


module.exports = router;