import userActionTypes from './user.types';
import  { registerUserSuccess, 
          registerUserFailure, 
          loginUserSuccess, 
          loginUserFailure, 
          getUserBlogSuccess, 
          getUserBlogFailure,
          logoutUserSuccess,
          logoutUserFailure
        } from './user.actions';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { registerUserAPI, loginUserAPI, logoutUserAPI, getUserBlogsAPI } from './user.api';


// Register
function* registerUser({payload}) {
    try {
        const userData = yield registerUserAPI(payload)
        if(!userData) {
            throw Error ('User already registered')
        }
        yield put(registerUserSuccess(payload))
    } catch (error) {
        yield put(registerUserFailure(error))
    }
}

function* onRegisterUserStart () {
    yield takeLatest(userActionTypes.REGISTER_USER_START, registerUser)
}

// Login
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

// Listening for New User to Register, then Login
function* onRegisterUserSuccess() {
    yield takeLatest(userActionTypes.REGISTER_USER_SUCCESS, loginUser)
}

// Listening for Return User to Log In
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

// Get User Blogs
function* getUserBlogs({payload}) {
    try {
        // payload =  {currentUser, token}

        const data = yield getUserBlogsAPI(payload)
        if(!data) {
            window.sessionStorage.removeItem("token");
            throw Error('Can not get User Blogs because user token expired')
        } 
        yield put(getUserBlogSuccess())
    } catch (error) {
        yield put(getUserBlogFailure(error.message))
    }
}

function* onGetUserBlogStart() {
    yield takeLatest(userActionTypes.GET_USERBLOGS_START, getUserBlogs)
}

// All User Sagas
function* userSagas() {
    yield all([call(onRegisterUserStart), call(onRegisterUserSuccess), call(onGetUserBlogStart), call(onLogOutUserStart), call(onLoginUserStart)])
}

export default userSagas;