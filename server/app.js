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

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
console.log(allowedOrigins);
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps, curl requests)
        if (!origin) return callback(null, true);

        // Check if the request origin is in the allowedOrigins array
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Deny the request
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
    proxy: true,
    cookie: {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
}));

app.use('/api', AuthRoutes);
app.use('/api', AuthController.isAuth, TaskRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server Listening on PORT 3000');
});