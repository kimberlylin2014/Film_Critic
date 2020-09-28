import { all, call } from 'redux-saga/effects';

// import sagas here
import userSagas from './user/users.sagas';
import movieSagas from './movie/movie.sagas';

function* rootSaga() {
    yield all([call(userSagas), call(movieSagas)])
}

export default rootSaga;