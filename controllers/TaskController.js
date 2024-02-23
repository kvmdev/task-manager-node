const Task = require("../models/Task");

class TaskController {
    static async createTask(req, res){
        try {
            const { title, note } = req.body;
            
            const task = new Task({
                title,
                note,
                user_id: req.session.user.id
            });

            const result = await task.save();

            if(result) {
                res.status(201).json({message: "Created successfully"});
            } else {
                res.status(500).json({message: "Couldn`t create task"});
            }
            
        } catch(e) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async editTasks(req, res) {
        try {
            const { title, note } = req.body;
            
            const updatedTask = {
                title,
                note
            };

            const result = await Task.updateOne({_id: req.params.id}, updatedTask);

            if(result) {
                res.status(201).json({message: "Created successfully"});
            } else {
                res.status(500).json({message: "Couldn`t create task"});
            }
            
        } catch(e) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            
            
            const task = await Task.findOne({_id: id});
            
            console.log(req.session.user.id + "sera");

            if(task.user_id === req.session.user.id) {

                const result = await Task.deleteOne({_id: id});
                
                if(result.deletedCount > 0) {

                    res.status(204).json({message: "Deleted successfully"});
                
                } else {
                    throw Error("");
                }

            } else {
                res.status(404).json({message: "Invalid credentials"});
            }
            
        } catch(e) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

module.exports = { TaskController };