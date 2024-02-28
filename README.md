
# Console Rental. Link to the deployed site: https://weatherforcast-45di.onrender.com/register

## Overview
GameFusion is a Node.js application designed to manage rentals for various gaming consoles and games. This project was created by Kussainov Ansar, a student of SE-2201.

## Installation
1. Clone the repository: git clone https://github.com/KussainovAnsar/ConsoleRental.git 
2. Navigate to the project directory: cd etc 
3. Install dependencies: npm install express mongoose express-session body-parser https path ejs nodemon axios i18n

## Usage
1. Start the server: npm start (u need to install nodemon)
2. Open a web browser and go to `http://localhost:3000` to access the application.

## Project Structure
The project structure consists of the following directories and files:

config: Contains configuration files for the project.
database.js: Configuration file for connecting to MongoDB Atlas.
locales: Localization files for different languages (if applicable).
models: Contains Mongoose models for MongoDB documents.
item.js: Model for rental items.
quiz.js: Model for quizzes (if applicable).
user.js: Model for user accounts.
routes: Contains route handlers for different endpoints.
about.js: Route handler for the about page.
admin.js: Route handler for admin-related actions.
adminAuth.js: Route handler for admin authentication.
bonus.js: Route handler for bonus features (if applicable).
contact.js: Route handler for the contact page (if applicable).
views: Contains EJS view templates for rendering HTML pages.
app.js: Entry point of the application.

## Admin Login
To access the admin panel, use the following credentials:
- Username: Ansar
- Password: Qqwerty1!

## API Endpoints
- `/admin`: Admin panel for managing users and weather data.
- `/login/admin`: Admin login page.
- `/admin/adduser`: Add a new user.
- `/admin/edituser/:id`: Edit an existing user.
- `/admin/deleteuser/:id`: Delete an existing user.
- YouTube API
- Game news API


