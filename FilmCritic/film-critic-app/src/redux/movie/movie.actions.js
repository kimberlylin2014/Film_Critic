import movieActionTypes from './movie.types';

export const resetMovieSearch = () => {
    return {
        type: movieActionTypes.RESET_MOVIESEARCH,
    }
}

// Get Movie Search for PUBLIC ROUTE
export const getMovieSearchStart = (searchWords) => {
    return {
        type: movieActionTypes.GET_MOVIESEARCH_START,
        payload: searchWords
    }
}

export const getMovieSearchSuccess = (results) => {
    return {
        type: movieActionTypes.GET_MOVIESEARCH_SUCCESS,
        payload: results
    }
}

export const getMovieSearchFailure = (error) => {
    return {
        type: movieActionTypes.GET_MOVIESEARCH_FAILURE,
        payload: error
    }
}

// Get Movie Search for PRIVATE ROUTE
export const getPrivateMovieSearchStart = (searchWords) => {
    return {
        type: movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_START,
        payload: searchWords
    }
}

export const getPrivateMovieSearchSuccess = (results) => {
    return {
        type: movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_SUCCESS,
        payload: results
    }
}

export const getPrivateMovieSearchFailure = (error) => {
    return {
        type: movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_FAILURE,
        payload: error
    }
}

export const getPrivateMovieSearchFailureSession = (error) => {
    return {
        type: movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_FAILURE_SESSION,
        payload: error
    }
}

// Post Movie Review
export const submitMovieReviewStart = (review) => {
    return {
        type: movieActionTypes.SUBMIT_MOVIEREVIEW_START,
        payload: review
    }
}

export const submitMovieReviewSuccess = (movieResult) => {
    return {
        type: movieActionTypes.SUBMIT_MOVIEREVIEW_SUCCESS,
        payload: movieResult
    }
}

export const submitMovieReviewFailure = (error) => {
    return {
        type: movieActionTypes.SUBMIT_MOVIEREVIEW_FAILURE,
        payload: error
    }
}

export const submitMovieReviewFailureSession = (error) => {
    return {
        type: movieActionTypes.SUBMIT_MOVIEREVIEW_FAILURE_SESSION,
        payload: error
    }
}

// GET MOVIE REVIWS BY MOVIE ID
export const getReviewsByMovieIDStart = (movieID) => {
    return {
        type: movieActionTypes.GET_REVIEWSBYMOVIEID_START,
        payload: movieID
    }
}

export const getReviewsByMovieIDSuccess = (reviews) => {
    return {
        type: movieActionTypes.GET_REVIEWSBYMOVIEID_SUCCESS,
        payload: reviews
    }
}

export const getReviewsByMovieIDFailure = (error) => {
    return {
        type: movieActionTypes.GET_REVIEWSBYMOVIEID_FAILURE,
        payload: error
    }
}

export const getReviewsByMovieIDFailureSession = (error) => {
    return {
        type: movieActionTypes.GET_REVIEWSBYMOVIEID_FAILURE_SESSION,
        payload: error
    }
}
// GET FAVORITE MOVIE REVIEWS BY MOVIE ID
export const getFavoriteMovieReviewsStart = () => {
    return {
        type: movieActionTypes.GET_FAVORITEMOVIEREVIEW_START,
    }
}

export const getFavoriteMovieReviewsSuccess = (data) => {
    return {
        type: movieActionTypes.GET_FAVORITEMOVIEREVIEW_SUCCESS,
        payload: data
    }
}

export const getFavoriteMovieReviewsFailure = (error) => {
    return {
        type: movieActionTypes.GET_FAVORITEMOVIEREVIEW_FAILURE,
        payload: error
    }
}

// export const getFavoriteMovieReviewsFailureSession = (error) => {
//     return {
//         type: movieActionTypes.GET_FAVORITEMOVIEREVIEW_FAILURE_SESSION,
//         payload: error
//     }
// }

// UPDATE REVIEW
export const updateReviewStart = (updatedReview) => {
    return {
        type: movieActionTypes.UPDATE_REVIEW_START,
        payload: updatedReview
    }
}

export const updateReviewSuccess = (finalReview) => {
    return {
        type: movieActionTypes.UPDATE_REVIEW_SUCCESS,
        payload: finalReview
    }
}

export const updateReviewFailure = (error) => {
    return {
        type: movieActionTypes.UPDATE_REVIEW_FAILURE,
        payload: error
    }
}

export const updateReviewFailureSession = (error) => {
    return {
        type: movieActionTypes.UPDATE_REVIEW_FAILURE_SESSION,
        payload: error
    }
}

// DELETE REVIEW
export const deleteReviewStart = (reviewObj) => {
    return {
        type: movieActionTypes.DELETE_REVIEW_START,
        payload: reviewObj
    }
}

export const deleteReviewSuccess = (resp) => {
    return {
        type: movieActionTypes.DELETE_REVIEW_SUCCESS,
        payload: resp
    }
}

export const deleteReviewFailure = (error) => {
    return {
        type: movieActionTypes.DELETE_REVIEW_FAILURE,
        payload: error
    }
}

export const deleteReviewFailureSession = (error) => {
    return {
        type: movieActionTypes.DELETE_REVIEW_FAILURE_SESSION,
        payload: error
    }
}