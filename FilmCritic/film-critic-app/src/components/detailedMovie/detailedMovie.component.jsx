import React from 'react';
import './detailedMovie.styles.scss';
import DetailedFanReviews from '../detailedFanReviews/detailedFanReviews.component';
import DetailedMovieRatings from '../detailedMovieRatings/detailedMovieRatings.component';
import DetailedMovieInfoContainer from '../detailedMovieInfo/detailedMovieInfo.container';

const DetailedMovie = ({...props}) => {
    return(
        <div className='DetailedMovie'>
            <DetailedMovieRatings {...props}/>
            <DetailedMovieInfoContainer {...props}/>   
            <DetailedFanReviews {...props}/>
        </div>
    )
}

export default DetailedMovie;