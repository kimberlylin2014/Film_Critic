import userActionTypes from './user.types';
import movieActionTypes from '../movie/movie.types';

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    errorMessage: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.LOGIN_USER_START:
        case userActionTypes.REGISTER_USER_START:
            return {
                ...state,
                isLoading: true
            }
        case userActionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload
            }
        case userActionTypes.LOGIN_USER_FAILURE:
        case userActionTypes.REGISTER_USER_FAILURE:
        case userActionTypes.LOGOUT_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }
        case userActionTypes.LOGOUT_USER_SUCCESS:
        case userActionTypes.RESET_USER:   
        case movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_FAILURE_SESSION:
        case movieActionTypes.SUBMIT_MOVIEREVIEW_FAILURE_SESSION:
        case movieActionTypes.GET_REVIEWSBYMOVIEID_FAILURE_SESSION:
        case movieActionTypes.DELETE_REVIEW_FAILURE_SESSION:
        case movieActionTypes.UPDATE_REVIEW_FAILURE_SESSION: 
   
            return {
                currentUser: null,
                isLoading: false,
                errorMessage: null
            }
        default:
            return state;
    }
}

export default userReducer;