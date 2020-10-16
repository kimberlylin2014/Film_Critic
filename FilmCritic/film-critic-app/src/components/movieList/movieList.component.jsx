import React from 'react';
import './movieList.styles.scss';
import PrivateMovie from '../privateMovie/privateMovie.component.';
import Movie from '../movie/movie.component';

const MovieList = ({...props}) => {
    const {movieList, privateRoute} = props;
    return(
        <div className='MovieList'>
            {movieList.map(movie => {
                return  privateRoute ? <PrivateMovie {...movie} key={movie.imdbID} {...props}/> : <Movie {...movie} key={movie.imdbID} {...props}/> 
            })}
        </div>
    )
}

export default MovieList;