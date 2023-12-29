This project is a full-stack web application using React with TypeScript for the frontend and Node.js with Express for the backend. It features a single-page application (SPA) that renders UI components like posts, comments, albums, photos, and todos.

## Getting Started
This project was developed with React for the frontend and Node.js for the backend.

## Prerequisites
Before running the project, ensure you have Node.js installed on your system. You can download it from Node.js official website.

## Installing Dependencies
Backend Dependencies
Navigate to the server directory:

## cd server
Install the required packages:

## yarn 
Frontend Dependencies
Navigate to the frontend directory:


## cd ..
Install the required packages:

## yarn 

Available Scripts
In the project directory, you can run:

## yarn run server (For Backend)
Runs the backend server in development mode.
Typically, the server will start on http://localhost:3001.

## yarn start (For Frontend)
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser. The page will reload if you make edits.

Using the Application

Ensure both the frontend and backend servers are running simultaneously for full functionality. The frontend communicates with the backend API for data retrieval and manipulation.

Project Structure

Backend
Express Server: Handles API requests.
Routes: Specific routes for albums, comments, photos, posts, and todos.

Middleware: Utilizes cors for cross-origin requests and body-parser for request parsing.
Controllers: Used to communicate with correct 3rd party tool to manipulate data.

Frontend
React Components: Manages views for different functionalities.
React Router: Handles in-app navigation.
Axios: Facilitates HTTP requests to the backend.


## Future improvements

On the frontend I wanted to use scss and make use of modules so styles aren't shared everywhere, infact using tailwind would have been a better approach.

I wanted to break down components so each domain(view) has its own list of components but the project was not big enough.

I also wanted to add more tests but due to time I could not.