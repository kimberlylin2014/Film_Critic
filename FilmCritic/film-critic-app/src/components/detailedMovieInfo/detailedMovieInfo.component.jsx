import React from 'react';
import './detailedMovieInfo.styles.scss';

const DetailedMovieInfo = ({...props}) => {
    const {Poster, Rated, Genre, Director, Actors, Plot, Production, Awards} = props;
    return (
        <div className='DetailedMovieInfo'>
            <div className='title-img'>                  
                <img src={Poster} alt="movie" width='210px'/>
            </div>
            <div className='details'>
                <p><span className='bold-text'> Directed By:</span> {Director}</p>
                <p><span className='bold-text'> Genre:</span> {Genre}</p>
                <p><span className='bold-text'>Production:</span>  {Production}</p>
                <p><span className='bold-text'>Rated:</span>  {Rated}</p>
                <p><span className='bold-text'>Awards:</span>  {Awards}</p>
                <p><span className='bold-text'>Actors:</span>  {Actors}</p>
                <p><span className='bold-text'>Plot:</span>  {Plot}</p>    
            </div>
        </div>
    )
}

export default DetailedMovieInfo;