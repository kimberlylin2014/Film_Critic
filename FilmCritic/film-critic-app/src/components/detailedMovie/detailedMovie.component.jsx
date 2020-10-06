import React from 'react';
import './detailedMovie.styles.scss';
import Review from '../review/review.component';
import  FanReviewModal  from '../fanReviewModal/fanReviewModal.component';
const DetailedMovie = ({...props}) => {
    const {Title, Year, Poster, Rated, Genre, Director, Actors, Plot, imdbRating, averageFanScore, moreReviewInfo} = props;
    
    return(
        <div className='DetailedMovie'>
            <div className='MovieInfo'>
                <div className='title-img'>
                    
                    <img src={Poster} alt="movie" width='300px'/>
        
                </div>
                <div className='details'>
                    <h2>{Title} ({Year})</h2>
                    <p><span className='bold-text'> Directed By:</span> {Director}</p>
                    <p><span className='bold-text'>Rated:</span>  {Rated}</p>
                    <p><span className='bold-text'> Genre:</span> {Genre}</p>
                    <p><span className='bold-text'>Actors:</span>  {Actors}</p>
                    <p><span className='bold-text'>Plot:</span>  {Plot}</p>
                </div>
            </div>
            <h3>RATINGS</h3>
            <hr/>
            <div className='MovieRatings'>
                <div className='Critic'>
                    <div className='rating'>
                        <img src="https://www.flaticon.com/svg/static/icons/svg/889/889118.svg" alt="imdb-icon" width='90px'/>
                        {parseFloat(imdbRating)/10 * 100}%
                    </div>
                    <div className='label'>
                        IMDB Critic Score
                    </div>
                </div>
                <div className='Audience'>
                    <div className='rating'>
                        <img src="https://www.flaticon.com/svg/static/icons/svg/850/850109.svg" alt="audience-icon" width='90px'/>
                        {averageFanScore ? <div>{parseFloat(averageFanScore)/5 * 100}%</div> : 'N/A'}
                        <FanReviewModal buttonLabel='Review!' className={`review-modal`} {...props}/>
                    </div>
                    <div className='label'>
                        Audience Score
                    </div>
                </div>
               
            </div>
            <h3>AUDIENCE REVIEWS</h3>
            <hr/>
            <div className='FanReviews'>
       
                <div className='row'>
                  {moreReviewInfo ?  moreReviewInfo.map(review => 
                    <div className='col-6' key={review.userid}>
                        {console.log(review)}
                        <Review {...review} {...props} />
                    </div>
                    )
                :  <div className='col-12'><p>No Fan Reviews At This Moment</p></div>  }
                </div>
            </div>
        </div>
    )
}

export default DetailedMovie;