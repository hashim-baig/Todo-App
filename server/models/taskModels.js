const db = require('../config/db');

const addTask = (userId, task) => {
    const query = `INSERT INTO tasks (user_id, task_name) VALUES (?, ?)`;
    
    return new Promise ((resolve, reject) => {
        db.query(query, [userId, task], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })
}

const getTasks = (userId) => {
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
    
    return new Promise((resolve, reject) => {
        db.query(query, [userId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })
    
    
}

const updateStatus = (taskId, status) => {
    const query = `UPDATE tasks SET status = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [status, taskId], (err, result) => {
            if(err) reject(err);
            resolve(result)
        });
    })
    
}

const clearCompleted = () => {
    const query = `DELETE from tasks WHERE status = 'completed'`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if(err) reject(err);
            resolve(result)
        });
    })
    
}

module.exports = {
    addTask,
    getTasks,
    updateStatus,
    clearCompleted
}