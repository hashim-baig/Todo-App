
---

# Task Management Application

This project is a **Task Management Application** built using **Node.js**, **Express**, **MySQL**, and **React**. Users can register, log in, create, view, update, and delete their tasks. It includes features like filtering tasks by status and clearing completed tasks. 

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features
- User Registration & Login
- Create, Update, Delete Tasks
- Filter tasks by status: Active, Completed
- Clear Completed Tasks
- User authentication using sessions

## Technologies Used
- **Backend**: Node.js, Express, MySQL
- **Frontend**: React.js
- **Authentication**: bcrypt (password hashing), Express sessions (for user login/logout)
- **Database**: MySQL
- **API Testing**: Postman or any REST client

## Installation
To set up the project locally, follow the steps below:

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL

### Steps to Install
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install Backend Dependencies**
   Navigate to the `server` directory and install the dependencies:
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   Navigate to the `client` directory and install the dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. **Set Up MySQL Database**
   - Create a MySQL database:
     ```sql
     CREATE DATABASE task_management;
     ```
   - Import the provided SQL schema (`tasks.sql` or similar) into your database. The schema contains the `users` and `tasks` tables.

   ```bash
   mysql -u your-username -p task_management < db_schema.sql
   ```

5. **Configure Environment Variables**
   You need to create a `.env` file in the `server` folder with the following content:

   ```bash
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=task_management
   SESSION_SECRET=your_session_secret
   ```

## Environment Variables
- `DB_HOST`: MySQL database host (usually `localhost`).
- `DB_USER`: MySQL username.
- `DB_PASSWORD`: MySQL password.
- `DB_NAME`: Name of the database to connect to.
- `SESSION_SECRET`: A secret key for signing session cookies.

## API Endpoints

### Auth
- **POST** `/register`: Register a new user.
- **POST** `/login`: Log in a user.
- **POST** `/logout`: Log out the user.

### Tasks
- **GET** `/tasks`: Retrieve all tasks for the logged-in user.
- **POST** `/tasks`: Create a new task.
- **PATCH** `/tasks/:id`: Update a task's status (e.g., `pending`, `completed`).
- **DELETE** `/tasks/:id`: Delete a task.
- **DELETE** `/clear-completed`: Clear all completed tasks for the logged-in user.

## Running the Application

1. **Start the Backend Server**
   In the `server` folder, run:
   ```bash
   npm start
   ```
   This will start the backend on `http://localhost:3000`.

2. **Start the Frontend**
   In the `client` folder, run:
   ```bash
   npm run dev
   ```
   This will start the React frontend.

## Project Structure

```bash
├── client/            # Frontend React application
├── server/            # Backend Node.js/Express application
│   ├── controllers/   # Route handlers
│   ├── models/        # Database interaction logic
│   ├── routes/        # API routes
│   ├── db.js          # MySQL database connection
│   └── app.js      # Entry point of the backend
└── README.md          # This file
```

## Contributing
If you'd like to contribute, please follow these guidelines:
- Fork the repository.
- Create a new feature branch: `git checkout -b feature/your-feature-name`.
- Commit your changes: `git commit -m 'Add some feature'`.
- Push to the branch: `git push origin feature/your-feature-name`.
- Open a pull request.

---

Feel free to customize it with more project-specific information as needed!