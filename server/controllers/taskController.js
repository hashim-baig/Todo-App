const TaskModels = require('../models/taskModels');

const addTask = (req, res) => {
    const {id} = req.session.user;
    const task = req.body.task;
    
    TaskModels.addTask(id, task, () => {  
        res.status(200).send("OK Added from Server");
    })
};

const getTasks = (req, res) => {
    const {id} = req.session.user;
    TaskModels.getTasks(id, (err, result) => {
        res.send(result);
    });
}

const updateStatus = (req, res) => {
    const {taskId, status} = req.body;

    const newStatus = status === "pending" ? "completed" : "pending"

    TaskModels.updateStatus(taskId, newStatus, () => {
        res.status(200).send("Task status updated successfully");
    });
}

const clearCompleted = (req, res) => {
    const {id} = req.session.user;
    TaskModels.clearCompleted(() => {
        TaskModels.getTasks(id, (err, result) => {
            res.status(200).send(result);
        });
    })
}


module.exports = {
    addTask,
    getTasks,
    updateStatus,
    clearCompleted
}