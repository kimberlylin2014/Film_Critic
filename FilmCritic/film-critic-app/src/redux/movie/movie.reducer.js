import movieActionTypes from './movie.types';
import userActionTypes from '../user/user.types';
import { updateMovieListWithNewReviews } from './movie.util';

const INITIAL_STATE = {
    movieList: [],
    singleMoviePage: [],
    errorMessage: null,
    isLoading: false
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case movieActionTypes.GET_MOVIESEARCH_START:
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_START:
        case movieActionTypes.GET_REVIEWSBYMOVIEID_START:
        case movieActionTypes.UPDATE_REVIEW_START:
        case movieActionTypes.DELETE_REVIEW_START:
            return {
                ...state,
                errorMessage: null,
                isLoading: true
            }
        case movieActionTypes.GET_MOVIESEARCH_SUCCESS:
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_SUCCESS:
      
            return {
                ...state,
                isLoading: false,
                movieList : [...action.payload],
                singleMoviePage: []
            }
        case movieActionTypes.GET_REVIEWSBYMOVIEID_SUCCESS:
        case movieActionTypes.UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                singleMoviePage: [...action.payload]
            }
        case movieActionTypes.GET_MOVIESEARCH_FAILURE:
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_FAILURE:
        case movieActionTypes.UPDATE_REVIEW_FAILURE:
        case movieActionTypes.DELETE_REVIEW_FAILURE:
            return {
                ...state,
                movieList: [],
                singleMoviePage: [],
                isLoading: false,
                errorMessage: null
            }
        case userActionTypes.LOGOUT_USER_SUCCESS:
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_FAILURE_SESSION:
        case movieActionTypes.SUBMIT_MOVIEREVIEW_FAILURE_SESSION:
        case movieActionTypes.GET_REVIEWSBYMOVIEID_FAILURE_SESSION:
        case movieActionTypes.UPDATE_REVIEW_FAILURE_SESSION:
        case movieActionTypes.RESET_MOVIESEARCH:
        case movieActionTypes.DELETE_REVIEW_FAILURE_SESSION:
            return {
                movieList: [],
                singleMoviePage: [],
                errorMessage: null,
                isLoading: false
            }
        default:
            return state
    }
}

export default movieReducer;