import React from 'react';
import './detailedMovie.styles.scss';
import DetailedFanReviews from '../detailedFanReviews/detailedFanReviews.component';
import DetailedMovieRatings from '../detailedMovieRatings/detailedMovieRatings.component';
import DetailedMovieInfo from '../detailedMovieInfo/detailedMovieInfo.component';

const DetailedMovie = ({...props}) => {
    console.log(props)
    return(
        <div className='DetailedMovie'>
            <h3>RATINGS</h3>
            <hr/>
            <DetailedMovieRatings {...props}/>
            <br/>
            <DetailedMovieInfo {...props}/>
   
   
            <h3>AUDIENCE REVIEWS</h3>
            <hr/>
            <DetailedFanReviews {...props}/>
        </div>
    )
}

export default DetailedMovie;