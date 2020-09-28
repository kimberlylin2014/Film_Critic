const fetch = require('node-fetch');


// ************** GET MOVIES ROUTE *********************/
const checkIfMoviesExistInDB = (detailedMovies, db) => {
    const movieIDs = detailedMovies.map(movie => {
        return movie.imdbID
    })
    return db('movies')
        .returning('*')
        .whereIn('id', movieIDs)
        .then(foundMovies => {
            return foundMovies;
        })
}

const getMovieDetailsByID = async(movies) => {
    const { Search } = movies;
    const moviePromises = await Search.map(async (movie) => {
        const resp = await fetch(`http://omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&i=${movie.imdbID}`)
        const movieData = await resp.json()
        return movieData;
    })
    const detailedMovies = await Promise.all(moviePromises);
    return detailedMovies;
}

const appendReviewScoreToMovie = (detailedMovies, moviesFoundInDB, db) => {
    for(let i = 0; i < moviesFoundInDB.length; i++) {
        for(let j = 0; j < detailedMovies.length; j++) {
            if(moviesFoundInDB[i].id === detailedMovies[j].imdbID) {
                detailedMovies[j].averagefanscore = moviesFoundInDB[i].averagefanscore
                detailedMovies[j].fanreviews = moviesFoundInDB[i].fanreviews;
            }
        }
    }
    return detailedMovies;
}

// GET MOVIES ROUTE
const getMovies = async (req, res, db) => {
    try {
        const resp = await fetch(`http://omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&s=${req.params.movie}`);
        if(resp.status === 200) {
            const data = await resp.json();
            if(data.Response === "False") {
               return null
            } 
            const detailedMovies = await getMovieDetailsByID(data)

            const moviesFoundInDB = await checkIfMoviesExistInDB(detailedMovies, db)
            if(moviesFoundInDB.length > 0) {
                const detailedMoviesUpdated = await appendReviewScoreToMovie(detailedMovies, moviesFoundInDB, db)  
                return detailedMoviesUpdated;
            }
            return detailedMovies;
        } 
        return null   
    } catch (error) {
        console.debug('Caught an error inside getMovies')
        console.debug(error);
        return null;
    }
}

// **************************** SUBMIT REVIEW ROUTE ********************* /

// Update Movie Table's Reviews Array with New Review ID
const updateMovieTableWithNewReview = (tx, req, reviewID) => {
    const { imdbID } = req.params;
    return tx('movies')
        .where({id: imdbID})
        .update({fanreviews: tx.raw('array_append(fanreviews, ?)', [reviewID[0]])})
        .returning("*")
        .then(movie => {
            return movie;
        })
}

// Get Reviews from Review Table from Array of Review IDs (movie table)
const getMovieReviewArray = (tx, req, movie) => {
    const fanReviewIDs = movie[0].fanreviews;

    return tx('reviews')
        .returning('*')
        .whereIn('id', fanReviewIDs)
        .then(reviewData => {
            return reviewData;
        })
}

// Loop through Reviews to get Average Fan Score
const getAverageFanScore = (tx, req, reviewData) => {
    let score = 0;
    reviewData.forEach(review => {
        score += parseInt(review.fanscore)
    })
    const totalReviews = reviewData.length;
    const averageScore = parseFloat(score/totalReviews).toFixed(1);
    return averageScore;
}

// Update Average Score in Move Table
const updateAverageScore = (tx, req, averageScore) => {
    const { imdbID } = req.params;
    return tx('movies')
        .returning('*')
        .where({id: imdbID})
        .update({averagefanscore: averageScore})
        .then(finalUpdatedMovie => {
            return finalUpdatedMovie;
        })
}

const handleSubmitReviewIfMovieExistsInDB = (tx, req, reviewID) => {
    console.log('movie already exists in db')
    return updateMovieTableWithNewReview(tx,req,reviewID)
        .then(movie => getMovieReviewArray(tx, req, movie))
        .then(reviewData =>  getAverageFanScore(tx, req, reviewData))
        .then(averageScore => updateAverageScore(tx, req, averageScore))
        .then(finalUpdatedMovie => finalUpdatedMovie[0])
}

// Create new Movie to Movie Table
const insertNewMovieToDB = (tx, req) => {
    const { imdbID } = req.params;
    return tx('movies')
        .returning('*')
        .insert({
            id: imdbID,
        })
        .then(movieDataTable => {
            return movieDataTable;
        })
}

const handleSubmitReviewIfMovieDoesNotExistInDB = (tx, req, reviewID) => {
    console.debu('movie is not in db')
    return insertNewMovieToDB(tx, req)
        .then(movieDataTable => updateMovieTableWithNewReview(tx,req,reviewID))
        .then(movie => getMovieReviewArray(tx, req, movie))
        .then(reviewData => getAverageFanScore(tx, req, reviewData))
        .then(averageScore => updateAverageScore(tx, req, averageScore))
        .then(finalUpdatedMovie => finalUpdatedMovie[0])
}

//Movie exists in DB: 
const movieExistsInDB = (req, tx) => {
    const { imdbID } = req.params;
    return tx('movies')
        .where({id: imdbID})
        .select('id')
        .then(data =>{
            return data;
        })
}

// Create new Review to Review Table
const insertNewReviewToDB = (tx, req) => {
    const { userID, imdbID } = req.params;
    const { review, score } = req.body;
    return tx('reviews')
        .returning('id')
        .insert({review: review, fanscore: score, userid: userID, movieid: imdbID})
        .then(reviewID => {
            return reviewID;
        })
}

// Handle Submit Review Transaction
const submitReviewTransaction = (req, db) => {
    return db.transaction(tx => {
        return insertNewReviewToDB(tx, req)
            .then(reviewID => {
                return movieExistsInDB(req, tx)
                    .then(data => {
                        if(data.length === 0) {
                            return handleSubmitReviewIfMovieDoesNotExistInDB(tx, req, reviewID)
                        } 
                        return handleSubmitReviewIfMovieExistsInDB( tx, req, reviewID)
                    })          
            })
            .then(tx.commit)
            .catch(tx.rollback)            
    })
    .catch(error => console.log(error))
}

// Check if User Already Reviewed the Selected Movie
const userAlreadyReviewedSelectedMovie = (req, db) => {
    const { userID, imdbID } = req.params;
    return db('reviews')
        .select('*')
        .where({userid: userID, movieid: imdbID})
        .then(data => {
            console.log(data)
            if(data.length > 0) {
                // User can not leave another review
                return true;
            } 
            // user can submit review
            return false;
        })
}

// SUBMIT FIRST REVIEW MOVIE ROUTE
const submitReview = (req, res, db) => {
    return userAlreadyReviewedSelectedMovie(req, db)
        .then(denied => {
            if(denied) {
                return null;
            }
            return submitReviewTransaction(req, db)
        })
        .catch(error => console.log(error))
}

// GET REVIEWS BY MOVIE ID
const getReviewsByMovieID = (req, res, db) => {
  
        const { imdbID } = req.params;
        return db.transaction(tx => {
            return db('reviews')
                .select('*')
                .where({movieid: imdbID})
                .join('users', 'reviews.userid', '=' , 'users.id')
                .then(reviewsArray => {
                    return getOneDetailMovieByID(imdbID)
                        .then(detailedMovie => {
                            const obj= [{...detailedMovie, reviewsArray: [...reviewsArray]}]
                            console.log(obj);
                            return obj;
                        })
                })
                .then(tx.commit)
                .catch(tx.rollback)
        })
        .catch(error => console.log(error))   
}

const getOneDetailMovieByID = async (imdbID) => {
    const resp = await fetch(`http://omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&i=${imdbID}`);
    const movieData = await resp.json()
    return movieData;
}
module.exports = {
    getMovies: getMovies,
    submitReview: submitReview,
    getReviewsByMovieID: getReviewsByMovieID
}