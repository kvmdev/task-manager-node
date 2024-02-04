const { Task } = require("../models/Task");

class TaskController {
    static async createTask(req, res){
        try {
            const { title, note } = req.body;
            const rows = await Task.createTask({ title, note, id: req.session.user.id});

            if(rows.affectedRows > 0) {
                res.status(201).json({message: "Created successfully"});
            } else {
                res.status(500).json({message: "Couldn`t create task"});
            }
        } catch(e) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

module.exports = { TaskController };