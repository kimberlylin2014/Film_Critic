import React from 'react';
import './privateMovie.styles.scss';
import { Button } from 'reactstrap';
import FanReviewModal from '../fanReviewModal/fanReviewModal.component';
import {withRouter} from 'react-router-dom';
// DB: id, Title, Year, Poster, Plot, Director, Rotten Tomatoes, Rated, Review[ids]
const PrivateMovie = ({...props}) => {
    const {Title, Year, Poster, Plot, Director, imdbRating, Rated, imdbID, averagefanscore, fanreviews, history} = props;
    return (
        <div className='PrivateMovie'>
            <div className='img'>
                <img src={Poster} alt={Title} width='250px' height='300px'/>
            </div>
            <div className='details'>
                <div>
                    <h4>{Title}</h4>
                    <p className='m-0'> {Plot}</p> 
                </div>
              
                <div className='ratings'>
                    <div className='imdb-review'>
                        <img src="https://www.flaticon.com/svg/static/icons/svg/889/889118.svg" alt="imdb-icon" width='90px' />
                        {/* <p>{imdbRating}/10</p> */}
                        <p>{parseFloat(imdbRating)/10 * 100}%</p>
                    </div>
                    <div className='fan-review'>
                        <div className='fan-score'>
                            <img src="https://www.flaticon.com/svg/static/icons/svg/3126/3126589.svg" alt="fan-icon" width='75px'/>
                            {/* <p>{averagefanscore ? `${averagefanscore}/5` : "N/A"}</p> */}
                          
                            <p>  {averagefanscore ? <div>{parseFloat(averagefanscore)/5 * 100}%</div> : 'N/A'}</p>
                            {/* <div className='rating'>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/850/850109.svg" alt="fan-icon" width='70px'/>
                                <p>{averagefanscore ? `${averagefanscore}/5` : "N/A"}</p>
                            </div>
                            <div className='write-review-btn'>
                                <FanReviewModal buttonLabel='Review!' className={`review-modal`} {...props}/>
                            </div> */}
                        </div>
                        <div className='total'>
                            {fanreviews ? `${fanreviews.length} reviews` : 'No reviews'}
                        </div>
                    </div>
            
                        
                </div>
                <div  className='view-more'>
                    <Button onClick={() => history.push(`/movies/${imdbID}/reviews`)}>More Details >> </Button>

                </div>
            </div>    
           

        </div>
    )
}

export default withRouter(PrivateMovie);