# Video Creation Tool - Full-Stack MERN Application

## Overview
Video Creation Tool is a full-stack project management application built using the MERN stack (MongoDB, Express, React, Node.js). The platform allows users to manage videos and associated tasks, providing a clean and intuitive experience for individual users, with room for future collaboration features. This capstone project demonstrates the complete development of a modern web application. The backend API is an evolution of the earlier TaskMaster project, expanded and integrated with a React frontend.

## Key Concepts Demonstrated
Full-stack MERN architecture
JWT-based authentication and authorization
Secure user registration and login
Ownership-based access control
Nested resource relationships
RESTful API design
Full CRUD functionality
React Context API for global state management
Client-side routing with React Router
Secure deployment with Render and MongoDB Atlas

## User Capabilities
###Authentication
Register a new account with email and password
Log in and receive a signed JSON Web Token (JWT)
Maintain a secure authenticated session
Log out safely

### Video Management
Create new videos with a title and description
View a dashboard of all videos owned by the user
View details of a single video
Update or delete only videos they own

## Task Management
Create tasks within a specific video
Assign task details including title, description, and status (To Do, In Progress, Done)
View all tasks associated with a video
Update task details and status
Delete tasks from a video
All task actions are restricted to videos owned by the user

## Features
### Authentication & Authorization
Passwords hashed using bcrypt
JWTs used for secure authentication
Authentication middleware protects all sensitive routes
Strict ownership-based authorization for videos and tasks

### Video Management
Full CRUD functionality
Each video belongs to a single user
Users can only access or modify their own videos

### Task Management
Full CRUD functionality
Tasks are nested under videos
Authorization checks ensure the user owns the parent video

### Data Validation
Mongoose schemas enforce required fields and relationships
MongoDB ObjectId references model 

### Error Handling
Consistent, descriptive error messages
Proper HTTP status codes returned (201, 400, 401, 403, 404, 500)
JSON API Responses
Standardized JSON responses across all endpoints
Designed for easy frontend integration

## Tech Stack

### Backend
Node.js – JavaScript runtime
Express – RESTful API framework
MongoDB Atlas – Cloud database
Mongoose – Object data modeling
bcrypt – Password hashing
jsonwebtoken (JWT) – Authentication
dotenv – Environment variable management

### Frontend
React – UI library
Vite – Frontend build tool
React Router DOM – Client-side routing
Context API – Global state management
Fetch API – Backend communication
Tools & Deployment
Postman – API testing
Render – Backend & frontend deployment
GitHub – Version control

## API Endpoints
### User Authentication
POST /api/users/register – Register a new user
POST /api/users/login – Log in and receive JWT

### Videos (Protected Routes)
POST /api/videos – Create a new video
GET /api/videos – Get all videos for logged-in user
GET /api/videos/:id – Get a single video by ID
PUT /api/videos/:id – Update a video
DELETE /api/videos/:id – Delete a video

All video routes require authentication and enforce ownership.

### Tasks
POST /api/videos/:videoId/tasks – Create a task for a video
GET /api/videos/:videoId/tasks – Get all tasks for a video
PUT /api/tasks/:taskId – Update a task
DELETE /api/tasks/:taskId – Delete a task
Task routes include authorization checks to ensure the user owns the parent video.

## State Management & Data Handling
Mongoose models define schemas for User, Video, and Task
JWT authentication middleware protects video and task routes
Ownership checks prevent unauthorized access
Relationships enforced using MongoDB ObjectId references
Frontend authentication state managed using React Context API

## Deployment
Backend deployed as a Web Service on Render
Frontend deployed as a Static Site on Render
MongoDB hosted on MongoDB Atlas
Environment variables securely managed via Render dashboard
Link to Frontend - https://capstone-1-4xtv.onrender.com/login
Link to Backend -  https://capstone-dm8z.onrender.com/

## Thank Yous and Acknowledgements 
-Previous Lessons 
-My own code (especially for the backend) 
-W3 Schools 
-Stack Overflow (big thank you for this it helped me fix editing a video) 

## Additional Notes
Built following RESTful API best practices
Modular backend structure separates routes, controllers, models, and middleware
Fully responsive frontend design
Fully tested using Postman


