const fetch = require('node-fetch');
// ************** START OF GET FAVORITE MOVIE REVIEW FUNCTIONS *********************/
const getFavoriteMovieByIDHandler = async(req, res, db) => {
    try {
        let Search = [{imdbID: 'tt0241527'}, {imdbID: 'tt2294629'}, {imdbID: 'tt1201607'}]
        const moviePromises = await Search.map(async (movie) => {
            const resp = await fetch(`http://omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&i=${movie.imdbID}`)
            const movieData = await resp.json()
            return movieData;
        })
        const detailedMovies = await Promise.all(moviePromises);
        // console.log(detailedMovies);



        const moviesFoundInDB = await checkIfMoviesExistInDB(detailedMovies, db)
            if(moviesFoundInDB.length > 0) {
                const detailedMoviesUpdated = await appendReviewScoreToMovie(detailedMovies, moviesFoundInDB, db) 
                console.log(detailedMoviesUpdated) 
                return detailedMoviesUpdated;
            }
            // console.log(detailedMovies)
            return detailedMovies;
        // return detailedMovies;
    } catch (error) {
        console.debug('Caught an error inside getFavoriteMovies')
        console.debug(error);
        return null;
    }
}
// ************** END OF GET FAVORITE MOVIE REVIEW FUNCTIONS *********************/


// ************** START OF GET MOVIES FUNCTIONS *********************/

// GET MOVIES HANDLER
const getMoviesHandler = async (req, res, db) => {
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
                console.log(detailedMoviesUpdated) 
                return detailedMoviesUpdated;
            }
            console.log(detailedMovies)
            return detailedMovies;
        } 
        return null   
    } catch (error) {
        console.debug('Caught an error inside getMovies')
        console.debug(error);
        return null;
    }
}

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
// ************** END of GET MOVIES FUNCTIONS *********************/


// **************************** START SUBMIT REVIEW FUNCTIONS ********************* /

// SUBMIT REVIEW HANDLER
const submitReviewHandler = (req, res, db) => {
    return userAlreadyReviewedSelectedMovie(req, db)
        .then(denied => {
            if(denied) {
                return null;
            }
            return submitReviewTransaction(req, db)
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

// Handle submit review if movie is not in DB
const handleSubmitReviewIfMovieDoesNotExistInDB = (tx, req, reviewID) => {
    console.debug('movie is not in db')
    return insertNewMovieToDB(tx, req)
        .then(movieDataTable => updateMovieTableWithNewReview(tx,req,reviewID))
        .then(fanReviewIDs => getMovieReviewArray(tx, req, fanReviewIDs))
        .then(reviewData => getAverageFanScore(reviewData))
        .then(averageScore => updateAverageScore(tx, req, averageScore))
        .then(finalUpdatedMovie => finalUpdatedMovie[0])
}

// Handle submit review if movie exists in DB
const handleSubmitReviewIfMovieExistsInDB = (tx, req, reviewID) => {
    console.log('movie already exists in db')
    return updateMovieTableWithNewReview(tx,req,reviewID)
        .then(fanReviewIDs => getMovieReviewArray(tx, req, fanReviewIDs))
        .then(reviewData =>  getAverageFanScore(reviewData))
        .then(averageScore => updateAverageScore(tx, req, averageScore))
        .then(finalUpdatedMovie => finalUpdatedMovie[0])
}

// Add New Movie to Movie Table if Movie Does Not Exist In DB
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

// **************************** END of SUBMIT REVIEW FUNCTIONS ********************* /


// *************** START of GET REVIEWS BY MOVIEID FUNCTIONS ********************* /

// Get Reviews By Movie ID Handler
const getReviewsByMovieIDHandler = (req, res, db) => {
    return db.transaction(tx => {
        return getReviewsByMovieID(tx, req)
    })
    .catch(error => console.log(error))    
}

// Select All Review By MovieIDs by Joining All Tables
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

// Get Movie Details from OMDB API by Movie ID
const getOneDetailMovieByID = async (imdbID) => {
    const resp = await fetch(`http://omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&i=${imdbID}`);
    const movieData = await resp.json()
    return movieData;
}

// *************** END of GET REVIEWS BY MOVIEID FUNCTIONS ********************* /


// *************** START of UPDATE REVIEWS BY REVIEW ID FUNCTIONS ********************* /

// Update Review By Review ID Handler
const updateReviewByReviewIDHandler = (req, res, db) => {
    return db.transaction(tx => {
        return completeUpdateReviewTransaction(req, tx)  
    })   
    .catch(error => console.log(error))
}

// Complete Update Review Transaction
const completeUpdateReviewTransaction = (req, tx) => {
    return updateReviewTableByReviewID(tx, req)
        .then(updatedReview => {
            return updateMovieTableByMovieID(tx, req)
                .then(fanReviewIDS => getMovieReviewArray(tx, req, fanReviewIDS))
                .then(reviewData => getAverageFanScore(reviewData))
                .then(averageScore =>updateAverageScore(tx, req, averageScore))
                .then(finalUpdatedMovie => getReviewsByMovieID(tx, req))
        })
    .then(tx.commit)
    .catch(tx.rollback)     
}

// UPDATE REVIEW Table BY REVIEW ID
const updateReviewTableByReviewID = (tx, req) => {
    const {reviewID } = req.params;
    const { review, fanscore } = req.body;
    return tx('reviews')
        .where({id: reviewID})
        .update({review : review,
                fanscore: fanscore
        })
        .returning("*")
        .then(updatedReview => updatedReview)
}

// UPDATE MOVIES TABLE by FAN REVIEW
const updateMovieTableByMovieID = (tx, req) => {
    const {imdbID} = req.params;
    return tx('movies')
        .select('movies.fanreviews')
        .where({id: imdbID})
        .then(fanReviewArray => fanReviewArray[0].fanreviews)
}

// *************** END of UPDATE REVIEWS BY REVIEW ID FUNCTIONS ********************* /


// *************** START of DELETE REVIEW FUNCTIONS ********************* /

// Delete Review by Review ID Handler
const deleteReviewByReviewIDHandler = (req, res, db) => {
    return db.transaction(tx => {
        return deleteReviewByReviewID(tx, req)
    })
    .catch(error => console.log(error))
}

// Delete Review from Review Table
const deleteReviewByReviewID = (tx, req) => {
    const {reviewID, imdbID} = req.params;
    return tx('reviews')
        .where({id: reviewID})
        .del()
        .then(deleted => updateMovieTableWithDeletedReview(tx, req)
        .then(data => determineFanReviewLengthAfterDeleteReview(tx, req, data))
)
    .then(tx.commit)
    .catch(tx.rollback)
}

// update movie table witih deleted review
const updateMovieTableWithDeletedReview = (tx, req) => {
    const {reviewID, imdbID} = req.params;
    return tx('movies')
        .where({id: imdbID})
        .update({fanreviews: tx.raw('array_remove(fanreviews, ?)', reviewID)})
        .returning('*')
        .then(data => data)
}

//  determine if there are any fan reviews left after review deletion
const determineFanReviewLengthAfterDeleteReview = (tx, req, data) => {
    if(data[0].fanreviews.length > 0) {
        return getMovieReviewArray(tx, req, data[0].fanreviews)
            .then(reviewData => getAverageFanScore(reviewData))
            .then(averageScore => updateAverageScore(tx, req, averageScore))
            .then(finalUpdatedMovie => finalUpdatedMovie[0])
    } else {
        return updateAverageScore(tx, req, 0)
            .then(finalUpdatedMovie => finalUpdatedMovie[0])
    }  
}

// *************** END of DELETE REVIEW FUNCTIONS ********************* /

module.exports = {
    getMoviesHandler: getMoviesHandler,
    submitReviewHandler: submitReviewHandler,
    getReviewsByMovieIDHandler: getReviewsByMovieIDHandler,
    updateReviewByReviewIDHandler: updateReviewByReviewIDHandler,
    deleteReviewByReviewIDHandler: deleteReviewByReviewIDHandler,
    getFavoriteMovieByIDHandler: getFavoriteMovieByIDHandler
}