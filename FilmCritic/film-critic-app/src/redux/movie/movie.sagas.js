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
        updateReviewFailureSession
    } from './movie.actions';
import { getMoviesPublicAPI, getMoviesPrivateAPI, submitMovieReview, getReviewsByMovieID, updateReviewsByReviewID } from './movie.api';

function* getReviews({payload}) {
    try {
        const data = yield getReviewsByMovieID(payload);
        if(!data) {
            throw Error('Can not get reviews for this movie')
        } else if (data === 'Unauthorized') {
            throw Error(data)
        }
        yield put(getReviewsByMovieIDSuccess(data))
    }catch (error) {
        if(error.message === 'Unauthorized'){
            yield put(getReviewsByMovieIDFailureSession(error))
        } else {
            yield put(getReviewsByMovieIDFailure(error))
        }  
    }
}

function* onGetReviewsByMovieIDStart() {
    yield takeLatest(movieActionTypes.GET_REVIEWSBYMOVIEID_START, getReviews)
}

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
            console.log('testing')
            yield put(submitMovieReviewFailureSession(error))
        } else {
            yield put(submitMovieReviewFailure(error))
        } 
        
    }
}

function* onSubmitMovieReviewStart() {
    yield takeLatest(movieActionTypes.SUBMIT_MOVIEREVIEW_START, submitReview);
}
// Get Movies Private Route
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
        if(error.message === 'Your session has expired. Please sign back in.'){
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
            throw Error('Can not fetch movies')
        }
        yield put(getMovieSearchSuccess(data))
    } catch(error) {
        yield put(getMovieSearchFailure(error))
    }
}

function* onGetPublicMovieSearchStart() {
    yield takeLatest(movieActionTypes.GET_MOVIESEARCH_START, fetchMoviesPublic)
}

// Edit Review By User Id
function* updateReview({payload}) {
    try {
        const data = yield updateReviewsByReviewID(payload);
        if(!data) {
            throw Error('Can not update review')
        } else if (data === 'Unauthorized') {
            throw Error(data)
        }
        yield put(updateReviewSuccess(data))
    }catch (error) {
        if(error.message === 'Unauthorized'){
            yield put(updateReviewFailureSession(error))
        } else {
            yield put(updateReviewFailure(error))
        }  
    }
}

function* onUpdateReviewStart() {
    yield takeLatest(movieActionTypes.UPDATE_REVIEW_START, updateReview)
}

function* movieSagas() {
    yield all([call(onGetPublicMovieSearchStart), 
               call(onSubmitMovieReviewStart), 
               call(onGetReviewsByMovieIDStart), 
               call(onGetPrivateMovieSearchStart), 
               call(onSubmitReviewSuccess),
               call(onUpdateReviewStart)
               
            ])
}

export default movieSagas;