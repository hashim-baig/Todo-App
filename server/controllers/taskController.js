const TaskModels = require('../models/taskModels');

const addTask = async (req, res) => {
    const { id } = req.session.user;
    const task = req.body.task;


    await TaskModels.addTask(id, task)

    res.status(200).send("OK Added from Server");
};

const getTasks = async (req, res) => {
    const { id } = req.session.user;


    const tasks = await TaskModels.getTasks(id);

    res.send(tasks);
}

const updateStatus = async (req, res) => {
    const { taskId, status } = req.body;

    const newStatus = status === "pending" ? "completed" : "pending"

    await TaskModels.updateStatus(taskId, newStatus);

    res.status(200).send("Task status updated successfully");

}

const clearCompleted = async (req, res) => {
    const { id } = req.session.user;

    await TaskModels.clearCompleted();

    const tasks = await TaskModels.getTasks(id);
    res.status(200).send(tasks);

}


module.exports = {
    addTask,
    getTasks,
    updateStatus,
    clearCompleted
}