import React from 'react';
import './detailedMovie.styles.scss';
import DetailedFanReviews from '../detailedFanReviews/detailedFanReviews.component';
import DetailedMovieRatings from '../detailedMovieRatings/detailedMovieRatings.component';
import DetailedMovieInfo from '../detailedMovieInfo/detailedMovieInfo.component';

const DetailedMovie = ({...props}) => {
    console.log(props)
    return(
        <div className='DetailedMovie'>
            <DetailedMovieRatings {...props}/>
            <DetailedMovieInfo {...props}/>   
            <DetailedFanReviews {...props}/>
        </div>
    )
}

export default DetailedMovie;