export const updateMovieListWithNewReviews = (movieList, updatedReviews) => {
    const { fanreviews, averagefanscore } = updatedReviews;
    console.log(fanreviews);
    console.log(averagefanscore);
    return movieList.map(movie => {
        if(movie.imdbID === updatedReviews.id) {
            return {...movie, fanreviews, averagefanscore};
        }
        return movie;
    })    
}


