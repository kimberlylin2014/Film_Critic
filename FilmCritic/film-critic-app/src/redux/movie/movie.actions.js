import movieActionTypes from './movie.types';

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
        type: movieActionTypes.GET_REVIEWSBYMOVIEID_FAILURE,
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