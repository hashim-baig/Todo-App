const db = require('../config/db');

const addTask = (userId, task, callback) => {
    const query = `INSERT INTO tasks (user_id, task_name) VALUES (?, ?)`;
    db.query(query, [userId, task], callback);
}

const getTasks = (userId, callback) => {
    const query = ` SELECT 
            tasks.id AS task_id, 
            tasks.user_id, 
            tasks.task_name, 
            tasks.status, 
            tasks.created_at, 
            tasks.updated_at,
            users.username
        FROM tasks 
        INNER JOIN users ON tasks.user_id = users.id 
        WHERE users.id = ?;`;
    db.query(query, [userId], callback);
}

const updateStatus = (taskId, status, callback) => {
    const query = `UPDATE tasks SET status = ? WHERE id = ?`;
    db.query(query, [status, taskId], callback);
}

const clearCompleted = (callback) => {
    const query = `DELETE from tasks WHERE status = 'completed'`;
    db.query(query, callback);
}

module.exports = {
    addTask,
    getTasks,
    updateStatus,
    clearCompleted
}