# Pizza Delivery Application

Welcome to the Pizza Delivery Application! This web application allows users to order pizza using RazorPay checkout, create custom pizza recipes, and includes an admin dashboard for managing pizza ingredient inventory. The application is built using the MERN stack, which comprises React.js, Redux.js, Material UI, Node.js, Express.js, and Passport.js.

<img width="926" alt="Screenshot 2023-10-27 002652" src="https://github.com/asheshmandal2003/pizza_delivery_app/assets/116034358/c8f8912a-619e-4514-a24d-7006896f923d">


## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

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

The backend API will be accessible at [http://localhost:8000](http://localhost:8000).

## Usage

- Open your web browser and access the application at [http://localhost:3000](http://localhost:3000).
- Users can browse and order pizza using the RazorPay checkout.
- Users can create their custom pizza recipes.
- Admins can log in to the admin dashboard for ingredient inventory management.

## Features

- Pizza ordering and payment processing using RazorPay.
- User registration and authentication using Passport.js.
- User-friendly interface built with Material UI.
- Custom pizza recipe creation and management.
- Admin dashboard for ingredient inventory tracking.
- Secure backend using Express.js.

## Project Structure

The project structure is organized as follows:

- `client/`: Contains the React.js frontend application.
- `server/`: Contains the Node.js backend API.
- `server/routes/`: Defines the API routes.
- `server/controllers/`: Implements the route controllers.
- `server/models/`: Defines the database models (using MongoDB).
- `client/src/`: Contains React components, actions, reducers, and styles.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
