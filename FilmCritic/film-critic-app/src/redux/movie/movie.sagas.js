import movieActionTypes from './movie.types';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { getMovieSearchSuccess, getMovieSearchFailure, submitFirstMovieReviewSuccess, submitFirstMovieReviewFailure} from './movie.actions';
import { getMoviesAPI, submitFirstMovieReview } from './movie.api';


function* submitFirstReview({payload}) {
    try {   
        const data = yield submitFirstMovieReview(payload)
        console.log(data)
        if(!data) {
            throw Error('User Already Submitted A Review For This Movie')
        }
        yield put(submitFirstMovieReviewSuccess(data))
    } catch (error) {
        yield put(submitFirstMovieReviewFailure(error))
    }
}

function* onSubmitMovieReviewStart() {
    yield takeLatest(movieActionTypes.SUBMIT_FIRSTMOVIEREVIEW_START, submitFirstReview);
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
    yield all([call(onGetMovieSearchStart), call(onSubmitMovieReviewStart)])
}

export default movieSagas;