import movieActionTypes from './movie.types';
import userActionTypes from '../user/user.types';
import { updateMovieListWithNewReviews } from './movie.util';

const INITIAL_STATE = {
    movieList: [],
    errorMessage: null,
    isLoading: false
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case movieActionTypes.GET_MOVIESEARCH_START:
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_START:
        case movieActionTypes.GET_REVIEWSBYMOVIEID_START:
            return {
                ...state,
                isLoading: true
            }
        // case movieActionTypes.GET_REVIEWSBYMOVIEID_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: true
        //     }
        case movieActionTypes.GET_MOVIESEARCH_SUCCESS:
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_SUCCESS:
        case movieActionTypes.GET_REVIEWSBYMOVIEID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                movieList : [...action.payload]
            }
        case movieActionTypes.GET_MOVIESEARCH_FAILURE:
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }
        case movieActionTypes.SUBMIT_MOVIEREVIEW_SUCCESS:
            return {
                ...state,
                movieList: updateMovieListWithNewReviews(state.movieList, action.payload)
            }   
        case userActionTypes.LOGOUT_USER_SUCCESS:
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_FAILURE_SESSION:
        case movieActionTypes.SUBMIT_MOVIEREVIEW_FAILURE_SESSION:
        case movieActionTypes.GET_REVIEWSBYMOVIEID_FAILURE_SESSION:
        case movieActionTypes.RESET_MOVIESEARCH:
            return {
                movieList: [],
                errorMessage: null,
                isLoading: false
            }
        default:
            return state
    }
}

export default movieReducer;