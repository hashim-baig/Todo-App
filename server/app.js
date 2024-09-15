const express = require('express');
const cors = require('cors');
const session = require('express-session')
const db = require('./config/db')
const MySQLStore = require('express-mysql-session')(session);

const TaskRoutes = require('./routes/taskRoutes');
const AuthRoutes = require('./routes/authRoutes');
const AuthController = require('./controllers/authController')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const sessionStore = new MySQLStore({createDatabaseTable: true}, db);

app.use(session({
    key: 'user_sid',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 5 
    }
}));

app.use(AuthRoutes)
app.use(AuthController.isAuth, TaskRoutes);

app.listen(3000, () => {
    console.log('Server Listening on PORT 3000');
});