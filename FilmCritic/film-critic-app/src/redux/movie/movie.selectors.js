import { createSelector } from 'reselect';

const movieSelector = (state) => state.movies;

export const selectMovieList = createSelector(
    [movieSelector],
    (movies) => movies.movieList
)

export const selectIsMovieListLoading = createSelector(
    [movieSelector],
    (movies) => movies.isLoading
)

export const selectMovieErrorMessage = createSelector(
    [movieSelector],
    (movies) => movies.errorMessage
)