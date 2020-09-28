import React from 'react';
import './privateMovie.styles.scss';
import { Button } from 'reactstrap';
import FanReviewModal from '../fanReviewModal/fanReviewModal.component';
import {withRouter} from 'react-router-dom';
// DB: id, Title, Year, Poster, Plot, Director, Rotten Tomatoes, Rated, Review[ids]
const PrivateMovie = ({...props}) => {
    const {Title, Year, Poster, Plot, Director, imdbRating, Rated, imdbID, averagefanscore, fanreviews, history} = props;
    return (
        <div className='Movie'>
            <div className='img'>
                <img src={Poster} alt={Title} width='200px' height='250px'/>
            </div>
            <div className='details'>
                <h4>{Title}</h4>
                <p> {Plot}</p> 
                <div className='ratings'>
                        <div className='imdb-review'>
                            <img src="https://www.flaticon.com/svg/static/icons/svg/889/889118.svg" alt="imdb-icon" width='70px' />
                            <p>{imdbRating}/10</p>
                        </div>
                        <div className='fan-review'>
                            <div className='rating'>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/900/900397.svg" alt="star-icon" width='40px'/>
                                <p>{averagefanscore ? `${averagefanscore}/5` : "N/A"}</p>
                            </div>
                            <div className='write-review-btn'>
                                <FanReviewModal buttonLabel='Review!' className={`review-modal`} {...props}/>
                            </div>
                        </div>
                        
                </div>
                <p className='text-right' onClick={() => history.push(`/movies/${imdbID}/reviews`)}>{fanreviews ? `${fanreviews.length} reviews` : 'No reviews'} </p>
            </div>    
           

        </div>
    )
}

export default withRouter(PrivateMovie);