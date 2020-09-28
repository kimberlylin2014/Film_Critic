import React from 'react';
import PrivateMovie from '../privateMovie/privateMovie.component.';
import Movie from '../movie/movie.component.';

const MovieList = ({...props}) => {
    const {movieList, privateRoute} = props;
    return(
        <div>
            <h2>movielist</h2>
                {movieList.map(movie => {
                    return  privateRoute ? <PrivateMovie {...movie} key={movie.imdbID} {...props}/> : <Movie {...movie} key={movie.imdbID}/> 
                })}
          
        </div>
    )
}

export default MovieList;