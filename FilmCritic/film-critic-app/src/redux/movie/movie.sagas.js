import movieActionTypes from './movie.types';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { getMovieSearchSuccess, 
        getMovieSearchFailure, 
        submitMovieReviewSuccess, 
        submitMovieReviewFailure,
        submitMovieReviewFailureSession,
        getReviewsByMovieIDSuccess,
        getReviewsByMovieIDFailure,
        getReviewsByMovieIDFailureSession,
        getPrivateMovieSearchSuccess,
        getPrivateMovieSearchFailure,
        getPrivateMovieSearchFailureSession,
        updateReviewSuccess,
        updateReviewFailure,
        updateReviewFailureSession,
        deleteReviewSuccess, 
        deleteReviewFailure,
        deleteReviewFailureSession,
        getFavoriteMovieReviewsSuccess,
        getFavoriteMovieReviewsFailure
    } from './movie.actions';
import { getMoviesPublicAPI, getMoviesPrivateAPI, submitMovieReview, getReviewsByMovieID, updateReviewsByReviewID, deleteReviewByReviewID, getReviewsByMovieIDPublic } from './movie.api';

// Get Reviews
function* getReviews({payload}) {
    try {
        const data = yield getReviewsByMovieID(payload);
        if(!data) {
            throw Error('Can not get reviews for this movie')
        } else if (data === 'Unauthorized') {
            throw Error(data)
        }
        console.log(data)
        console.log('get reviews after submitting review')
        yield put(getReviewsByMovieIDSuccess(data))
    }catch (error) {
        if(error.message === 'Unauthorized'){
            yield put(getReviewsByMovieIDFailureSession(error.message))
        } else {
            yield put(getReviewsByMovieIDFailure(error.message))
        }  
    }
}

function* onGetReviewsByMovieIDStart() {
    yield takeLatest(movieActionTypes.GET_REVIEWSBYMOVIEID_START, getReviews)
}

// Get Favorite Movie Reviews
function* getFavoriteMovieReviews() {
    try {
        const data = yield getReviewsByMovieIDPublic();
        if(!data) {
            throw Error('Can not get reviews for this movie')
        } 
        console.log(data)
        yield put(getFavoriteMovieReviewsSuccess(data))
    }catch (error) {

        yield put(getFavoriteMovieReviewsFailure(error.message))

    }
}

function * onGetFavoriteMovieReviewStart() {
    yield takeLatest(movieActionTypes.GET_FAVORITEMOVIEREVIEW_START, getFavoriteMovieReviews)

}

// Submit Review
function* onSubmitReviewSuccess() {
    yield takeLatest(movieActionTypes.SUBMIT_MOVIEREVIEW_SUCCESS, getReviews)
}

function* submitReview({payload}) {
    try {   
        const data = yield submitMovieReview(payload)
        if(!data) {
            throw Error('User Already Submitted A Review For This Movie')
        } else if (data === 'Unauthorized') {
            throw Error(data)
        }
        yield put(submitMovieReviewSuccess(data))
    } catch (error) {
        if(error.message === 'Unauthorized'){
            yield put(submitMovieReviewFailureSession(error.message))
        } else {
            yield put(submitMovieReviewFailure(error.message))
        } 
        
    }
}

function* onSubmitMovieReviewStart() {
    yield takeLatest(movieActionTypes.SUBMIT_MOVIEREVIEW_START, submitReview);
}

// Get Movies Authenticated Route
function* fetchMoviesPrivate({payload}) {
    try {   
        const data = yield getMoviesPrivateAPI(payload);
        if(!data) {
            throw Error('Can not find movie. Try Again.')
        } else if (data === 'Unauthorized') {
            throw Error(data)
        }
        yield put(getPrivateMovieSearchSuccess(data))
    } catch(error) {
        if(error.message === 'Unauthorized'){
            yield put(getPrivateMovieSearchFailureSession(error.message))
        } else {
            yield put(getPrivateMovieSearchFailure(error.message))
        } 
    }
}

function* onGetPrivateMovieSearchStart() {
    yield takeLatest(movieActionTypes.GET_PRIVATE_MOVIES_SEARCH_START, fetchMoviesPrivate)
}

// Get Movies Public Route
function* fetchMoviesPublic({payload}) {
    try {   
        const data = yield getMoviesPublicAPI(payload);
        if(!data) {
            throw Error('Can not find movie. Try Again.')
        }
        yield put(getMovieSearchSuccess(data))
    } catch(error) {
        yield put(getMovieSearchFailure(error.message))
    }
}

function* onGetPublicMovieSearchStart() {
    yield takeLatest(movieActionTypes.GET_MOVIESEARCH_START, fetchMoviesPublic)
}

// Update Review 


function* updateReview({payload}) {
    try {
        const data = yield updateReviewsByReviewID(payload);
        if(!data) {
            throw Error('Can not update review')
        } else if (data === 'Unauthorized') {
            throw Error(data)
        }
        console.log(data)
        yield put(updateReviewSuccess(data))
    }catch (error) {
        if(error.message === 'Unauthorized'){
            yield put(updateReviewFailureSession(error.message))
        } else {
            yield put(updateReviewFailure(error.message))
        }  
    }
}

function* onUpdateReviewStart() {
    yield takeLatest(movieActionTypes.UPDATE_REVIEW_START, updateReview)
}

// Delete Review
function* onDeleteReviewSuccess() {
    yield takeLatest(movieActionTypes.DELETE_REVIEW_SUCCESS, getReviews)
}

function* deleteReview({payload}) {
    try {
        const data = yield deleteReviewByReviewID(payload);
        if(!data) {
            throw Error('Can not delete review')
        } else if (data === 'Unauthorized') {
            throw Error(data)
        }
        console.log(data)
        yield put(deleteReviewSuccess(data))
    }catch (error) {
        if(error.message === 'Unauthorized'){
            yield put(deleteReviewFailureSession(error.message))
        } else {
            yield put(deleteReviewFailure(error.message))
        }  
    }
}

function* onDeleteReviewStart() {
    yield takeLatest(movieActionTypes.DELETE_REVIEW_START, deleteReview)
}

function* movieSagas() {
    yield all([call(onGetPublicMovieSearchStart), 
               call(onSubmitMovieReviewStart), 
               call(onGetReviewsByMovieIDStart), 
               call(onGetPrivateMovieSearchStart), 
               call(onSubmitReviewSuccess),
               call(onUpdateReviewStart),
               call(onDeleteReviewStart),
               call(onDeleteReviewSuccess),
               call(onGetFavoriteMovieReviewStart)
            ])
}

export default movieSagas;