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
            const fanReviewIDs = movie[0].fanreviews;
            return fanReviewIDs;
        })
}

// Get Reviews from Review Table from Array of Review IDs (movie table)
const getMovieReviewArray = (tx, req, fanReviewIDs) => {
    return tx('reviews')
        .returning('*')
        .whereIn('id', fanReviewIDs)
        .then(reviewData => {
            return reviewData;
        })
}

// Loop through Reviews to get Average Fan Score
const getAverageFanScore = (reviewData) => {
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
        .then(fanReviewIDs => getMovieReviewArray(tx, req, fanReviewIDs))
        .then(reviewData =>  getAverageFanScore(reviewData))
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
    console.debug('movie is not in db')
    return insertNewMovieToDB(tx, req)
        .then(movieDataTable => updateMovieTableWithNewReview(tx,req,reviewID))
        .then(fanReviewIDs => getMovieReviewArray(tx, req, fanReviewIDs))
        .then(reviewData => getAverageFanScore(reviewData))
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
const getOneDetailMovieByID = async (imdbID) => {
    const resp = await fetch(`http://omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&i=${imdbID}`);
    const movieData = await resp.json()
    return movieData;
}

const getReviewsByMovieID = (tx, req) => {
    const { imdbID } = req.params;
    return tx('reviews')
        .select(
            'reviews.id',
            'reviews.fanscore',
            'reviews.review',
            'reviews.userid',
            'reviews.movieid',
            'users.email',
            'users.username',
            'movies.fanreviews',
            'movies.averagefanscore'
        )
        .where({movieid: imdbID})
        .join('users', 'reviews.userid', '=' , 'users.id')
        .join('movies', 'reviews.movieid', '=', 'movies.id')
        .then(reviewsArray => {
            console.log(reviewsArray)
            return getOneDetailMovieByID(imdbID)
                .then(detailedMovie => {
                    if(reviewsArray.length > 0) {
                        const averageFanScore = reviewsArray[0].averagefanscore;
                        const obj= [{...detailedMovie, averageFanScore: averageFanScore, moreReviewInfo: [...reviewsArray]}]
                        return obj;
                    }
                    const obj= [{...detailedMovie}]
                    return obj;
                })
        })
        .then(tx.commit)
        .catch(tx.rollback)
}
const getReviewsByMovieIDHandler = (req, res, db) => {
    return db.transaction(tx => {
        return getReviewsByMovieID(tx, req)
    })
    .catch(error => console.log(error))    
}

// UPDATE REVIEW BY REVIEW ID
const updateReviewByReviewID = (tx, req) => {
    const {reviewID, imdbID} = req.params;
    const { review, fanscore } = req.body;
    return tx('reviews')
        .where({id: reviewID})
        .update({review : review,
                fanscore: fanscore
        })
        .returning("*")
        .then(updatedReview => {
            return tx('movies')
                .select('movies.fanreviews')
                .where({id: imdbID})
                .then(fanReviewArray => {
                    const fanReviewIDS = fanReviewArray[0].fanreviews;
                    return getMovieReviewArray(tx, req, fanReviewIDS)
                        .then(reviewData => {
                            const averageScore = getAverageFanScore(reviewData)
                            return updateAverageScore(tx, req, averageScore)
                                .then(finalUpdatedMovie => {
                                    return getReviewsByMovieID(tx, req)
                                })
                        })                      
                })
        })
    .then(tx.commit)
    .catch(tx.rollback)
}

const updateReviewByReviewIDHandler = (req, res, db) => {
    return db.transaction(tx => {
        return updateReviewByReviewID(tx, req)
    })   
    .catch(error => console.log(error))
}


// Delete Review
const deleteReviewByReviewID = (tx, req) => {
    const {reviewID, imdbID} = req.params;
    return tx('reviews')
        .where({id: reviewID})
        .del()
        .then(deleted => {
           return tx('movies')
                .where({id: imdbID})
                .update({fanreviews: tx.raw('array_remove(fanreviews, ?)', reviewID)})
                .returning('*')
                .then(data => {
                    if(data[0].fanreviews.length > 0) {
                        return getMovieReviewArray(tx, req, data[0].fanreviews)
                            .then(reviewData => getAverageFanScore(reviewData))
                            .then(averageScore => updateAverageScore(tx, req, averageScore))
                            .then(finalUpdatedMovie => {
                                console.log(finalUpdatedMovie);
                                return finalUpdatedMovie[0]
                            })
                    } else {
                        return updateAverageScore(tx, req, 0)
                            .then(finalUpdatedMovie => finalUpdatedMovie[0])
                    }  
                })
        })
    .then(tx.commit)
    .catch(tx.rollback)
}

const deleteReviewByReviewIDHandler = (req, res, db) => {
    return db.transaction(tx => {
        return deleteReviewByReviewID(tx, req)
    })
    .catch(error => console.log(error))
}

module.exports = {
    getMovies: getMovies,
    submitReview: submitReview,
    getReviewsByMovieIDHandler: getReviewsByMovieIDHandler,
    updateReviewByReviewIDHandler: updateReviewByReviewIDHandler,
    deleteReviewByReviewIDHandler: deleteReviewByReviewIDHandler
}