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

const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || !isProduction) {
            callback(null, true); 
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },

    credentials: true
}));

app.options('*', cors());

app.use(express.json());

const sessionStore = new MySQLStore({ createDatabaseTable: true }, db);

app.use(session({
    secret: process.env.SESSION_SECRET,
    key: 'user_sid',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    proxy: isProduction,
    cookie: {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    }
}));

app.use('/api', AuthRoutes);
app.use('/api', AuthController.isAuth, TaskRoutes); 



app.listen(process.env.PORT, () => {
    console.log('Server Listening on PORT 3000');
});