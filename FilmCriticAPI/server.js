require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const redis = require('redis');
const redisClient = redis.createClient({host: '127.0.0.1'})
const cors = require('cors');

const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const auth = require('./controllers/authorization');
const posts = require('./controllers/posts');
const movie = require('./controllers/movie')
app.use(express.json());
app.use(cors())

var db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'kimberlylin',
      password : '',
      database : 'filmcritic'
    }
});

app.get('/', (req, res)=> {
    res.json('worked')
})

// Input ===> email: str, password: str
app.post('/register', async (req, res) => {
   register.handleRegister(req, res, bcrypt, db);
})

// Input ===> email: str, password: str
app.post('/login', async (req, res) => {
    signIn.signInAuthentication(req, res, bcrypt, db)
})

app.get('/:id/posts', auth.requireAuth, (req, res) => {
    posts.getUserPosts(req, res, db);
} )

app.post('/signout', (req, res) => {
    const { authorization } = req.headers;
    const tokenID = authorization.split(" ")[1];
    redisClient.del(tokenID, (error, reply) => {
        if(error) {
            console.log(error)
            res.status(400).json('Can not remove user token in Redis database')
        } else {
            console.log(reply)
            res.json('signed out successful')
        }
    })
})

app.get('/movieSearchPublic/:movie', async (req, res) => {
    try {
        const movies = await movie.getMovies(req, res, db)
        if(!movies) {
            throw Error('Can not find movie')
        }
        res.json(movies)
    } catch (error) {
        console.debug(error)
        res.status(400).json(error)
    }   
})

// Authenticated Routes
app.get('/movieSearchPrivate/:movie', auth.requireAuth, async (req, res) => {
    try {
        const movies = await movie.getMovies(req, res, db)
        if(!movies) {
            throw Error('Can not find movie')
        }
        res.json(movies)
    } catch (error) {
        console.debug(error)
        res.status(400).json(error)
    }   
})

app.post('/users/:userID/movies/:imdbID/review', auth.requireAuth, async (req, res) => {
    try {
        const data = await movie.submitReview(req, res, db);
        if(!data) {
            throw Error('User Already Reviewed This Movie')
        }
        res.json(data)
    } catch (error) {
        console.debug(error)
        res.status(400).json(error)
    }
})

app.get('/users/:userID/movies/:imdbID/reviews', auth.requireAuth, async (req, res) => {
    try {
        const data = await movie.getReviewsByMovieID(req, res, db);
        if(!data) {
            throw Error('Can not get reviews from selected movie')
        }
        res.json(data)
    } catch(error) {
        console.debug(error);
        res.status(400).json(error)
    }
})

app.listen(3000, () => console.log("server running on 3000"))