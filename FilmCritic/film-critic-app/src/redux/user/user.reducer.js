import userActionTypes from './user.types';

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
        case userActionTypes.GET_USERBLOGS_FAILURE:
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