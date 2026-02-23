# FullStack Task

A role-based project management system.Admin send invitation via email.User register via clicking that invitation link.Deactivated users can not login.

## Installation
1. Clone this repository
```bash
git clone <respository_url>
```
2. 📦 Install dependencies
```bash
cd backend
npm install 

cd frontend
cd vite-project
npm install
```

## Start the development server

```python
#port 4000
cd backend 
npm run dev

#port 5173
cd frontend
cd vite-project
npm run dev
```

### Admin Credentials
admin@test.com

password: admin123

### Manager Credentials
azlinaarabi@gmail.com
password:Azlina Arabi Hossain Aylin


### Tech Stack
Node.js
- Express
- MongoDB
- Mongoose
- React
- TypeScript
- Redux Toolkit
- Material UI

## 🚀 Features

### Authentication
- JWT-based authentication
- Role-based access control (ADMIN, MANAGER, STAFF)
- Secure invite-only registration
- Email-based onboarding using Nodemailer

### User Management (Admin Only)
- View all users
- Change user roles
- Activate / deactivate users
- Pagination support

### Project Management
- Create projects (All authenticated users)
- View projects
- Edit & delete (Admin only)
- Soft delete implementation

### UI Features
- Dark/light mode toggle
- Pagination for large datasets

---

## 🔐 Security Features

- JWT token authentication
- Protected routes middleware
- Role-based middleware
- Secure random invite token
- Invite expiration (24 hours)
- Environment variable protection
- Password hashing with bcrypt

---

## 🏗 Architecture

Backend:
- MVC structure
- Middleware-based authentication
- Modular route separation
- RESTful API design

Frontend:
- Redux for state management
- Protected & Admin routes
- Centralized layout component
- Material UI theming system
