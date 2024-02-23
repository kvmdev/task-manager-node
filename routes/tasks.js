const { TaskController: TC } = require("../controllers/TaskController");
const router = require("express").Router();

router.post("/", TC.createTask);
router.put("/:id", TC.editTasks);
router.delete("/:id", TC.deleteTask);

module.exports = router;