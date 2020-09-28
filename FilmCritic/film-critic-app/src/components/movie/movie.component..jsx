import React from 'react';
import './movie.styles.scss';
import { Button } from 'reactstrap';

// DB: id, Title, Year, Poster, Plot, Director, Rotten Tomatoes, Rated, Review[ids]
const Movie = ({Title, Year, Poster, Plot, Director, imdbRating, Rated}) => {
    return (
        <div className='Movie'>
            <div className='img'>
                <img src={Poster} alt={Title} width='200px' height='250px'/>
            </div>
            <div className='details'>
                <h4>{Title}</h4>
                <p> {Plot}</p>
                <div className='public-route text-right'>
                    <Button>Click Here for Reviews!</Button>
                </div>  
            </div>    
        </div>
    )
}

export default Movie;