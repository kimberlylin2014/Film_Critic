import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import movieReducer from './movie/movie.reducer';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['user','movies']
}

const rootReducer = combineReducers({
    user: userReducer,
    movies: movieReducer
})

export default persistReducer(persistConfig, rootReducer);