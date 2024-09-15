const db = require('../config/db');

const registerUser = (username, password) => {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    return new Promise ((resolve, reject) => {
        db.query(query, [username, password], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });

    })
}

const findUser = (username) => {
    const query = `SELECT * FROM users WHERE username = ?`;

    return new Promise((resolve, reject) => {        
        db.query(query, [username], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })
}




module.exports = {
    registerUser,
    findUser
}