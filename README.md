# Pizza Delivery Application 🍕

Welcome to the Pizza Delivery Application 🍕! This web application allows users to order pizza using RazorPay checkout, create custom pizza recipes, and includes an admin dashboard for managing pizza ingredient inventory. The application is built using the MERN stack, which comprises React.js, Redux.js, Material UI, Node.js, and Express.js.

### Homepage:
![Screenshot from 2025-01-09 03-48-21](https://github.com/user-attachments/assets/4f429de2-241b-4d16-afeb-9f5550f14330)

### Login Page:
![Screenshot from 2025-01-09 02-49-37](https://github.com/user-attachments/assets/5a85b805-2d95-40b4-a20a-0fb84925b283)

### Register Page
![Screenshot from 2025-01-09 02-51-51](https://github.com/user-attachments/assets/f57dd785-8719-4fba-8d36-c262717bef45)

### Payment UI:
![Screenshot from 2025-01-09 02-52-28](https://github.com/user-attachments/assets/24c1881e-72f8-4a6f-8826-d657b41937bb)


## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your system.
- A RazorPay account for payment processing (API keys required).
- MongoDB installed and running on your local machine or a remote server.

## Installation

To set up the Pizza Delivery Application, follow these steps:

### Frontend Installation

```bash
# Navigate to the frontend directory
cd client

# Install dependencies
npm install
```

### Backend Installation

```bash
# Navigate to the backend directory
cd server

# Install dependencies
npm install
```

## Getting Started

Follow these steps to start the application:

### Frontend

```bash
# Navigate to the frontend directory
cd client

# Start the development server
npm start
```

The frontend should now be accessible at [http://localhost:3000](http://localhost:3000).

### Backend

```bash
# Navigate to the backend directory
cd server

# Start the Node.js server
node index.js
```

The backend API will be accessible at [http://localhost:8080](http://localhost:8080).

## Usage

- Open your web browser and access the application at [http://localhost:3000](http://localhost:3000).
- Users can browse and order pizza using the RazorPay checkout (Use `success@razorpay` for free transactions).
- Users can create their custom pizza recipes.
- Admins can log in to the admin dashboard for ingredient inventory management.

## Features

- Pizza ordering and payment processing using RazorPay.
- User registration and authentication.
- Email Verification.
- Forgot password feature.
- Authentication using jsonwebtoken
- User-friendly interface built with Material UI.
- Custom pizza recipe creation and management.
- Admin dashboard for ingredient inventory tracking.
- Order tracking.

## Project Structure

The project structure is organized as follows:

- `client/`: Contains the React.js frontend application.
- `server/`: Contains the Node.js backend API.
- `server/routes/`: Defines the API routes.
- `server/controllers/`: Implements the route controllers.
- `server/models/`: Defines the database models (using MongoDB).
- `client/src/`: Contains React components, actions, reducers, and styles.
