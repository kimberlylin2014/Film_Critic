
# FilmCritic App

### Video Demo
https://youtu.be/R3mueh4cfcE

### Frontend 
* Javascript
* React
* Redux Saga
* React-Router
* Reselect 
* Redux Persist
* React.lazy and Suspense
* Sass
* Reactstrap

### Backend
* Node.js
* Express
* PostgreSQL
* Knex.js
* JSON Web Token
* Redis

### App Features
* Unauthenticated users are allowed to search for movies, where results only display movie poster, title, and plot
* Authenticated users have access to movie ratings and other movie details
* An authenticated user can submit, edit, and delete his/her personal review for each movie
* Submit Review Button is only available to the user if he/she has NOT submitted a review
* Edit and Delete Buttons are only available to the user who submitted the review
* The average fan rating score for each movie is re-calculated and updated when a user submits/updates/deletes his/her own review
* IMDB and Fan rating scoreboards are displayed with an animated progress bar
* When a user session expires, he/she will be automatically logged out of the app

### Overview
* Built a client-server model using React.js and Redux-Saga (client), Node.js and Express (server), and PostgreSQL (database) to create a full stack movie application
* Developed REST API that handles user registration, user login/logout, fetching movie data from a third party API (OMDb API), fetching reviews for each movie, and review creation/update/deletion
* JSON Web Token is used to authenticate client requests and manage user sessions
* Utilized Redis to store tokens in the backend
* Handle asynchronous calls and manage application states with Redux-Saga
* Using transactions in PostgreSQL to update multiple data tables at once within a single HTTP request
* Memoize functions with the Reselect Library
* Implement React Router to build a single page application (SPA) without the page refreshing as the user navigates
* Redux Persist is utilized to persist the application states


### Resources
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Icons made by Freepik (http://www.freepik.com/) and Pixel perfect (https://www.flaticon.com/authors/pixel-perfect) from www.flaticon.com
* API from OMDb API (http://omdbapi.com/)