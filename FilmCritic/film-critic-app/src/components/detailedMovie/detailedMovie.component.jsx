import React from 'react';
import './detailedMovie.styles.scss';
import DetailedFanReviews from '../detailedFanReviews/detailedFanReviews.component';
import DetailedMovieRatingsContainer from '../detailedMovieRatings/detailedMovieRatings.container';
import DetailedMovieInfoContainer from '../detailedMovieInfo/detailedMovieInfo.container';

const DetailedMovie = ({...props}) => {
    return(
        <div className='DetailedMovie'>
            <DetailedMovieRatingsContainer {...props}/>
            <DetailedMovieInfoContainer {...props}/>   
            <DetailedFanReviews {...props}/>
        </div>
    )
}

export default DetailedMovie;