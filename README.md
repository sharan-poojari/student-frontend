# \# Student Management System — Frontend

# 

# A modern React.js frontend for a full-stack \*\*Student Management System\*\*, integrated with a Node.js, Express.js, and MongoDB backend.

# 

# The application provides secure authentication, role-based access, student management, and an admin user-management interface.

# 

# \## 🌐 Live Application

# 

# \*\*Frontend:\*\*  

# https://student-frontend-liard.vercel.app/

# 

# \*\*Backend API:\*\*  

# https://student-api-9haq.onrender.com/

# 

# \*\*Backend Repository:\*\*  

# https://github.com/sharan-poojari/student-api

# 

# \---

# 

# \## 📌 Project Overview

# 

# The Student Management System is a full-stack web application designed to manage students through a secure and user-friendly interface.

# 

# The React frontend communicates with the backend REST API to handle authentication, student CRUD operations, user management, and role-based access control.

# 

# The application supports two primary roles:

# 

# \- \*\*User\*\* — Can manage their own students.

# \- \*\*Admin\*\* — Can manage users and their roles in addition to student management.

# 

# \---

# 

# \## ✨ Features

# 

# \### 🔐 Authentication

# 

# \- User signup

# \- User login

# \- JWT-based authentication

# \- Protected application access

# \- Persistent login using `localStorage`

# \- Current-user detection

# \- Secure logout

# 

# \### 👨‍🎓 Student Management

# 

# \- View students

# \- Add new students

# \- Update student information

# \- Delete students

# \- User-specific student management

# \- REST API integration

# 

# \### 👑 Admin Features

# 

# \- Admin-only user management

# \- View registered users

# \- View user roles

# \- Promote users to Admin

# \- Change Admin users back to regular Users

# \- Admin-protected functionality

# 

# \### 🛡️ Authorization

# 

# The frontend works with backend JWT authentication and role-based authorization.

# 

# Different UI features are displayed depending on the authenticated user's role.

# 

# Regular users cannot access admin-only user management functionality.

# 

# \### ⚠️ Application Handling

# 

# \- Loading states

# \- API error handling

# \- Authentication error handling

# \- Protected API requests

# \- Token-based API communication

# 

# \---

# 

# \## 🛠️ Technologies Used

# 

# \### Frontend

# 

# \- React.js

# \- JavaScript

# \- HTML5

# \- CSS3

# \- Vite

# 

# \### API \& Authentication

# 

# \- REST API

# \- Fetch API

# \- JWT Authentication

# \- LocalStorage

# 

# \### Backend Integration

# 

# \- Node.js

# \- Express.js

# \- MongoDB

# \- Mongoose

# 

# \### Development Tools

# 

# \- VS Code

# \- Git

# \- GitHub

# \- Postman

# \- Vercel

# 

# \---

# 

# \## 🏗️ Application Architecture

# 

# ```text

# React Frontend

# &#x20;     │

# &#x20;     │ REST API Requests

# &#x20;     ▼

# Node.js + Express.js Backend

# &#x20;     │

# &#x20;     │ Mongoose

# &#x20;     ▼

# MongoDB Atlas

# ```

# 

# Authentication flow:

# 

# ```text

# User

# &#x20;│

# &#x20;▼

# React Login

# &#x20;│

# &#x20;▼

# POST /api/auth/login

# &#x20;│

# &#x20;▼

# Express Backend

# &#x20;│

# &#x20;▼

# MongoDB

# &#x20;│

# &#x20;▼

# JWT Token

# &#x20;│

# &#x20;▼

# React localStorage

# &#x20;│

# &#x20;▼

# Protected API Requests

# ```

# 

# \---

# 

# \## 📂 Project Structure

# 

# ```text

# student-frontend/

# │

# ├── public/

# │

# ├── src/

# │   ├── App.jsx

# │   ├── App.css

# │   ├── Student.jsx

# │   └── main.jsx

# │

# ├── .env.example

# ├── .gitignore

# ├── eslint.config.js

# ├── index.html

# ├── package.json

# ├── package-lock.json

# ├── vite.config.js

# └── README.md

# ```

# 

# \---

# 

# \## 🔗 Backend API Integration

# 

# The frontend communicates with the deployed backend using the following API base URL:

# 

# ```text

# https://student-api-9haq.onrender.com

# ```

# 

# Main API endpoints used by the frontend:

# 

# \### Authentication

# 

# | Method | Endpoint | Purpose |

# |---|---|---|

# | POST | `/api/auth/signup` | Register a new user |

# | POST | `/api/auth/login` | Login user |

# | GET | `/api/auth/me` | Get current user |

# | GET | `/api/auth/users` | Get all users — Admin only |

# | PUT | `/api/auth/users/:id/role` | Update user role — Admin only |

# 

# \### Students

# 

# | Method | Endpoint | Purpose |

# |---|---|---|

# | GET | `/api/students` | Get students |

# | GET | `/api/students/:id` | Get student by ID |

# | POST | `/api/students` | Create student |

# | PUT | `/api/students/:id` | Update student |

# | DELETE | `/api/students/:id` | Delete student |

# 

# \---

# 

# \## ⚙️ Environment Variables

# 

# Create a `.env` file in the project root:

# 

# ```env

# VITE\_API\_BASE\_URL=http://localhost:3000

# ```

# 

# For production, the deployed backend URL is configured through Vercel:

# 

# ```env

# VITE\_API\_BASE\_URL=https://student-api-9haq.onrender.com

# ```

# 

# A template is also provided in:

# 

# ```text

# .env.example

# ```

# 

# > Never commit `.env` files or private credentials to GitHub.

# 

# \---

# 

# \## 🚀 Getting Started

# 

# \### 1. Clone the repository

# 

# ```bash

# git clone https://github.com/sharan-poojari/student-frontend.git

# ```

# 

# \### 2. Navigate to the project

# 

# ```bash

# cd student-frontend

# ```

# 

# \### 3. Install dependencies

# 

# ```bash

# npm install

# ```

# 

# \### 4. Configure environment variables

# 

# Create a `.env` file:

# 

# ```env

# VITE\_API\_BASE\_URL=http://localhost:3000

# ```

# 

# Make sure the backend server is running locally.

# 

# \### 5. Start the development server

# 

# ```bash

# npm run dev

# ```

# 

# The application will normally be available at:

# 

# ```text

# http://localhost:5173

# ```

# 

# \---

# 

# \## 🔑 Authentication

# 

# After successful login:

# 

# 1\. The frontend sends login credentials to the backend.

# 2\. The backend verifies the credentials.

# 3\. The backend generates a JWT token.

# 4\. The frontend stores the token in `localStorage`.

# 5\. The token is attached to protected API requests.

# 6\. The backend validates the token before allowing access.

# 

# Example:

# 

# ```http

# Authorization: Bearer <JWT\_TOKEN>

# ```

# 

# \---

# 

# \## 👑 Role-Based Access

# 

# The application supports role-based UI behavior.

# 

# \### Regular User

# 

# Can:

# 

# \- Login

# \- View their students

# \- Create students

# \- Update students

# \- Delete students

# 

# Cannot:

# 

# \- View all users

# \- Change user roles

# \- Access admin-only user management

# 

# \### Admin

# 

# Can:

# 

# \- Perform all regular user operations

# \- View all registered users

# \- Change user roles

# \- Manage application users

# 

# \---

# 

# \## 🧪 Testing

# 

# The backend APIs were tested using \*\*Postman\*\* before connecting them with the React frontend.

# 

# Testing included:

# 

# \- User signup

# \- User login

# \- JWT token generation

# \- Protected routes

# \- Student creation

# \- Student retrieval

# \- Student update

# \- Student deletion

# \- Admin authorization

# \- User role management

# 

# \---

# 

# \## ☁️ Deployment

# 

# \### Frontend

# 

# The React application is deployed on \*\*Vercel\*\*.

# 

# ```text

# https://student-frontend-liard.vercel.app/

# ```

# 

# \### Backend

# 

# The REST API is deployed on \*\*Render\*\*.

# 

# ```text

# https://student-api-9haq.onrender.com/

# ```

# 

# \### Database

# 

# The application uses \*\*MongoDB Atlas\*\* for cloud database storage.

# 

# \---

# 

# \## 🔒 Security

# 

# The project implements several security practices:

# 

# \- JWT-based authentication

# \- Password hashing with bcrypt

# \- Protected API routes

# \- Role-based authorization

# \- Admin-only user management

# \- Password fields excluded from user responses

# \- Environment variables for secrets

# \- `.env` excluded from Git

# 

# \---

# 

# \## 📈 Project Status

# 

# The application currently includes:

# 

# \- ✅ React frontend

# \- ✅ Node.js/Express backend

# \- ✅ MongoDB Atlas database

# \- ✅ User authentication

# \- ✅ JWT authorization

# \- ✅ Role-based access control

# \- ✅ Student CRUD operations

# \- ✅ Admin user management

# \- ✅ Frontend-backend integration

# \- ✅ Production deployment

# \- ✅ Professional documentation

# 

# \---

# 

# \## 🔮 Future Improvements

# 

# Possible future enhancements include:

# 

# \- Improved dashboard UI

# \- Search and filtering

# \- Pagination

# \- Form validation

# \- Better loading states

# \- Toast notifications

# \- Responsive UI improvements

# \- Password reset

# \- Profile management

# \- Advanced admin dashboard

# 

# \---

# 

# \## 👨‍💻 Author

# 

# \*\*Sharan Poojari\*\*

# 

# BSc.IT | Aspiring Full-Stack / MERN Developer

# 

# \### GitHub

# 

# https://github.com/sharan-poojari

# 

# \### Project Repository

# 

# https://github.com/sharan-poojari/student-frontend

