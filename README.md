# MERN Stack Student Management System

A simple CRUD application for managing students with role-based access control.

## Features

### Authentication
- Sign up and Login with email & password
- JWT authentication
- Password hashing with bcrypt

### User Roles
- **Admin**: Can view, add, edit, and delete all students
- **Student**: Can view and edit their own profile

### Student Information
- Name
- Email
- Course
- Enrollment Date

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **Icons**: Lucide React

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=9922
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
VITE_API_URL=http://localhost:9922
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. **Sign Up**: Create an account as Admin or Student
2. **Login**: Use your credentials to login
3. **Admin Dashboard**: 
   - View all students in a table
   - Add new students
   - Edit student details
   - Delete students
4. **Student Dashboard**:
   - View your profile
   - Update your name and course

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Students
- `GET /api/students` - Get all students (Admin only)
- `GET /api/students/me` - Get own profile (Student)
- `POST /api/students` - Add new student (Admin only)
- `PUT /api/students/:id` - Update student (Admin only)
- `PUT /api/students/me` - Update own profile (Student)
- `DELETE /api/students/:id` - Delete student (Admin only)

## Project Structure

```
crud/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   └── index.js
└── frontend/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── App.jsx
```
