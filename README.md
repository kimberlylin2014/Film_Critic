
# FilmCritic App

### Video Demo
https://youtu.be/vZ5eMu0eBXg

### Frontend 
* Javascript
* React
* Redux
* Redux Saga
* React-Router
* Reselect 
* Redux Persist
* Sass
* Reactstrap

### Backend
* Node.js
* Express
* PostgreSQL
* Knex.js

### App Features
* Unauthenticated users are allowed to search for movies, where details of each movie is limited.
* WHen user is registered and signed in, they have access to more features
* Authenticated users are able to write, edit, and delete reviews for each movie
* Fan review rating are calculated and updated every time a user submits a review
* IMDB and Fan rating scoreboards are displated with an animated progress bar
* When user session expires, they will be automatically logged out of the app

### Overview
* Built a client-server model using React.js and Redux-Saga (client), Node.js and Express (server), and PostgreSQL (database) to create a full stack movie application.
* Developed REST API that handles user registration, user login/logout, fetching movie data from a third party API (OMDb API), fetching reviews for each movie, and review creation/update/deletion.
* JSON Web Token is used to authenticate API routes and manage user sessions
* Utilized Redis to store tokens in the backend
* Handle asynchronous calls and manage application states with Redux-Saga.
* Using transactions in PostgreSQL to update multiple data tables at once within a single HTTP request.
* Memoize functions with the Reselect Library.
* Implement React Router to build a single page application (SPA) without the page refreshing as the user navigates.
* Redux Persist is utilized to persist the application states.


### Resources
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Icons made by Freepik and Pixel perfect from www.flaticon.com
* API from OMDb API (http://omdbapi.com/)