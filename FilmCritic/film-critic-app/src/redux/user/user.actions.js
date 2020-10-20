import userActionTypes from './user.types';

export const resetUser = () => {
    return {
        type: userActionTypes.RESET_USER
    }
}

export const registerUserStart = (credentials) => {
    return {
        type: userActionTypes.REGISTER_USER_START,
        payload: credentials
    }
}

export const registerUserSuccess = (user) => {
    return {
        type: userActionTypes.REGISTER_USER_SUCCESS,
        payload: user
    }
}

export const registerUserFailure = (error) => {
    return {
        type: userActionTypes.REGISTER_USER_FAILURE,
        payload: error
    }
}

export const loginUserStart = (credentials) => {
    return {
        type: userActionTypes.LOGIN_USER_START,
        payload: credentials
    }
}

export const loginUserSuccess = (user) => {
    return {
        type: userActionTypes.LOGIN_USER_SUCCESS,
        payload: user
    }
}

export const loginUserFailure = (error) => {
    return {
        type: userActionTypes.LOGIN_USER_FAILURE,
        payload: error
    }
}

export const logoutUserStart = () => {
    return {
        type: userActionTypes.LOGOUT_USER_START,
    }
}

export const logoutUserSuccess = () => {
    return {
        type: userActionTypes.LOGOUT_USER_SUCCESS,
    }
}

export const logoutUserFailure = (error) => {
    return {
        type: userActionTypes.LOGOUT_USER_FAILURE,
        payload: error
    }
}