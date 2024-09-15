const bcrypt = require('bcrypt')
const AuthModels = require('../models/authModels')

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await AuthModels.findUser(username);
        if (existingUser.length > 0) {
            return res.status(400).send('Username Taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(`Username: ${username}`)
        console.log(`Password: ${hashedPassword}`)

        await AuthModels.registerUser(username, hashedPassword);

        res.status(201).send('User Registered');

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Server Error');
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    console.log(`Username: ${username}`)
    console.log(`Password: ${password}`)

    const [user] = await AuthModels.findUser(username);

    if (!user || user.length === 0) {
        return res.status(401).send('User Not Found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        console.log('Password match')
        req.session.user = {
            id: user.id,
            username: user.username
        }
        res.status(200).json({ user: req.session.user });
    } else {
        res.status(401).send('Incorrect password.');
    }
}

const isAuth = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.status(401).send('Please Log In');

}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.clearCookie('user_sid');
        res.status(200).send('Logged out');
    });

}


module.exports = {
    register,
    login,
    isAuth,
    logout
}