const { TaskController: TC } = require("../controllers/TaskController");
const router = require("express").Router();

router.post("/", TC.createTask);

module.exports = router;