require('dotenv').config()

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
    origin: 'http://localhost:5173' || process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());

const sessionStore = new MySQLStore({createDatabaseTable: true}, db);

app.use(session({
	secret: process.env.SESSION_SECRET,
    key: 'user_sid',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,         
        secure: true,         
        sameSite: 'none'   
    }
}));

app.use('api', AuthRoutes)
app.use('/api', AuthController.isAuth, TaskRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server Listening on PORT 3000');
});