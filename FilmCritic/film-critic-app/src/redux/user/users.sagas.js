import userActionTypes from './user.types';
import  { registerUserSuccess, 
          registerUserFailure, 
          loginUserSuccess, 
          loginUserFailure, 
          logoutUserSuccess,
          logoutUserFailure
        } from './user.actions';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { registerUserAPI, loginUserAPI, logoutUserAPI, getUserBlogsAPI } from './user.api';
import movieActionTypes from '../movie/movie.types';


// Register User and Login
function* registerUser({payload}) {
    try {
        const userData = yield registerUserAPI(payload)
        if(!userData) {
            throw Error ('User already registered')
        }
        yield put(registerUserSuccess(payload))
    } catch (error) {
        yield put(registerUserFailure(error.message))
    }
}

function* onRegisterUserSuccess() {
    yield takeLatest(userActionTypes.REGISTER_USER_SUCCESS, loginUser)
}

function* onRegisterUserStart () {
    yield takeLatest(userActionTypes.REGISTER_USER_START, registerUser)
}

// Login User
function* loginUser({payload}) {
    try {
        const userDataAfterLogin = yield loginUserAPI(payload);
        if(!userDataAfterLogin) {
            throw Error('Wrong Credentials')
        }
        const {userData, accessToken} = userDataAfterLogin;
        yield window.sessionStorage.setItem("token", accessToken.token)
        yield put(loginUserSuccess(userData));
    } catch (error) {
        yield put(loginUserFailure(error.message))
    }
}

function* onLoginUserStart() {
    yield takeLatest(userActionTypes.LOGIN_USER_START, loginUser)
}

// Log out User
function* logOutUser() {
    try {
        const token = yield window.sessionStorage.getItem("token");
        const data = yield logoutUserAPI(token);
        if(!data) {
           throw Error('Can not log out user')
        }
        yield window.sessionStorage.removeItem("token");
        yield put(logoutUserSuccess())
    } catch (error ) {
        yield put(logoutUserFailure(error.message))
    }
}

function* onLogOutUserStart() {
    yield takeLatest(userActionTypes.LOGOUT_USER_START, logOutUser)
}

// Movie Session Failures
// function* onDeleteReviewFailureSession() {
//     yield takeLatest(movieActionTypes.DELETE_REVIEW_FAILURE_SESSION, logOutUser)
// }

// All User Sagas
function* userSagas() {
    yield all([call(onRegisterUserStart), call(onRegisterUserSuccess), call(onLogOutUserStart), call(onLoginUserStart)
        // ,call(onDeleteReviewFailureSession)
    ])
}

export default userSagas;