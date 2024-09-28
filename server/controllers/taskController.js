const TaskModels = require('../models/taskModels');

const addTask = async (req, res) => {
    const { id } = req.session.user;

    const task = req.body.task;


    const result = await TaskModels.addTask(id, task)

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

const deleteTask = async (req, res) => {
    const { taskId } = req.body;
    await TaskModels.deleteTask(taskId);
    res.status(200).send("Task deleted successfully");
}


module.exports = {
    addTask,
    getTasks,
    updateStatus,
    clearCompleted,
    deleteTask
}