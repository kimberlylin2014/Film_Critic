import movieActionTypes from './movie.types';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { getMovieSearchSuccess, 
        getMovieSearchFailure, 
        submitMovieReviewSuccess, 
        submitMovieReviewFailure,
        getReviewsByMovieIDSuccess,
        getReviewsByMovieIDFailure
    } from './movie.actions';
import { getMoviesAPI, submitMovieReview, getReviewsByMovieID } from './movie.api';

function* getReviews({payload}) {
    try {
        const data = yield getReviewsByMovieID(payload);
        if(!data) {
            throw Error('Can not get reviews for this movie')
        }
        yield put(getReviewsByMovieIDSuccess(data))
    }catch (error) {
        yield put(getReviewsByMovieIDFailure(error))
    }
}

function* onGetReviewsByMovieIDStart() {
    yield takeLatest(movieActionTypes.GET_REVIEWSBYMOVIEID_START, getReviews)
}

function* submitReview({payload}) {
    try {   
        const data = yield submitMovieReview(payload)
        console.log(data)
        if(!data) {
            throw Error('User Already Submitted A Review For This Movie')
        }
        yield put(submitMovieReviewSuccess(data))
    } catch (error) {
        yield put(submitMovieReviewFailure(error))
    }
}

function* onSubmitMovieReviewStart() {
    yield takeLatest(movieActionTypes.SUBMIT_MOVIEREVIEW_START, submitReview);
}

function* fetchMovies({payload}) {
    try {   
        const data = yield getMoviesAPI(payload);
        if(!data) {
            throw Error('Can not fetch movies')
        }
        yield put(getMovieSearchSuccess(data))
    } catch(error) {
        yield put(getMovieSearchFailure(error))
    }
}

function* onGetMovieSearchStart() {
    yield takeLatest(movieActionTypes.GET_MOVIESEARCH_START, fetchMovies)
}

function* movieSagas() {
    yield all([call(onGetMovieSearchStart), call(onSubmitMovieReviewStart), call(onGetReviewsByMovieIDStart)])
}

export default movieSagas;