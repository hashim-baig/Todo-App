const express = require('express');
const TaskController = require('../controllers/taskController')


const router = express.Router();

router.post('/add-tasks', TaskController.addTask);
router.get('/tasks', TaskController.getTasks);
router.post('/update-status', TaskController.updateStatus);
router.get('/clear-completed', TaskController.clearCompleted);
router.post('/delete-task',TaskController.deleteTask);

module.exports = router;