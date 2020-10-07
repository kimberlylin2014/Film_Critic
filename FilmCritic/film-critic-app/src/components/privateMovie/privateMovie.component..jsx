import React from 'react';
import './privateMovie.styles.scss';
import { Button } from 'reactstrap';
import FanReviewModal from '../fanReviewModal/fanReviewModal.component';
import {withRouter} from 'react-router-dom';
// DB: id, Title, Year, Poster, Plot, Director, Rotten Tomatoes, Rated, Review[ids]
class PrivateMovie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            audienceRating: ''
        }
        this.calculateImdbRating = this.calculateImdbRating.bind(this)
        this.calculateAudienceRating = this.calculateAudienceRating.bind(this)
        this.determineRatingImage = this.determineRatingImage.bind(this)
    }

    calculateImdbRating() {
        const {imdbRating} = this.props;
        return `${(parseFloat(imdbRating)/10 * 100).toFixed(0)}%`
    }

    calculateAudienceRating() {
        const {averagefanscore} = this.props;
        console.log(averagefanscore)
        if(averagefanscore) {
            return `${(parseFloat(averagefanscore)/5 * 100).toFixed(0)}%`
        } 
        return 'N/A'
    }

    determineRatingImage() {
        const {averagefanscore} = this.props;
        console.log(averagefanscore)
        const score = (parseFloat(averagefanscore)/5 * 100).toFixed(0)
        let imgSrc;
        if(score >= 0 && score < 70) {
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/2665/2665044.svg';
        } else if (score >= 70 && score < 90) {
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/3572/3572255.svg'
        } else if (score >= 90) {
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/616/616490.svg'
        } else {
            imgSrc= 'https://www.flaticon.com/svg/static/icons/svg/942/942751.svg'
        }
        return <img src={imgSrc} alt="audience-icon" width='70px'/> 
    }


    render() {
        const {Title, Year, Poster, Plot, Director, imdbRating, Rated, imdbID, averagefanscore, fanreviews, history} = this.props;
        console.log(averagefanscore)
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
                            <p>{this.calculateImdbRating()}</p>
                        </div>
                        <div className='fan-review'>
                            <div className='fan-score'>
                                {this.determineRatingImage()}
                                <p>  {this.calculateAudienceRating()}</p>
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
    
}

export default withRouter(PrivateMovie);