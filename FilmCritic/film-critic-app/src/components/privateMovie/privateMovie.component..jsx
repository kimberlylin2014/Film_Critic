import React from 'react';
import './privateMovie.styles.scss';
import { Button } from 'reactstrap';
import {withRouter} from 'react-router-dom';

class PrivateMovie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            audienceRating: ''
        }
        this.calculateImdbRating = this.calculateImdbRating.bind(this)
        this.calculateAudienceRating = this.calculateAudienceRating.bind(this)
        this.determineRatingImage = this.determineRatingImage.bind(this)
        this.determineIfPlural = this.determineIfPlural.bind(this)
        this.determineAudienceRatingText = this.determineAudienceRatingText.bind(this)
    }

    calculateImdbRating() {
        const {imdbRating} = this.props;
        return `${(parseFloat(imdbRating)/10 * 100).toFixed(0)}%`
    }

    calculateAudienceRating() {
        const {averagefanscore} = this.props;
        if(averagefanscore) {
            if(parseFloat(averagefanscore) === 0) {
                return ''
            }
            return `${(parseFloat(averagefanscore)/5 * 100).toFixed(0)}%`
        } 
        return ''
    }

    determineRatingImage() {
        const {averagefanscore} = this.props;
        const score = (parseFloat(averagefanscore)/5 * 100).toFixed(0)
        let imgSrc;
        if(score > 0 && score < 70) {
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/1301/1301458.svg';
        } else if (score >= 70 && score < 90) {
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/1301/1301447.svg'
        } else if (score >= 90) {
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/616/616656.svg'
        } else  {
            imgSrc= 'https://www.flaticon.com/svg/static/icons/svg/942/942751.svg'
        }
        return <img src={imgSrc} alt="audience-icon" width='70px'/> 
    }

    determineIfPlural() {
        const {fanreviews} = this.props;
        if(fanreviews.length === 1) {
            return 'Review'
        }
        return 'Reviews'
    }

    determineAudienceRatingText() {
        const {fanreviews} = this.props;
        if(fanreviews) {
            if(fanreviews.length === 0) {
                return 'Be First to Review!'
            }
            return `${fanreviews.length} Fan ${this.determineIfPlural()}`
        }
        return 'Be First to Review!'
     
    }

    render() {
        const {Title, Poster, Actors, Released, imdbVotes, imdbID, fanreviews, history} = this.props;
        return (
            <div className='PrivateMovie'>
                <div className='main-section'>
                    <div className='img'>
                        <img src={Poster} alt={Title} width='220px' height='280px'/>
                    </div>
                    <div className='details'>
                        <div className='top'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                <h3>{Title}</h3>
                                </div>
                                <div  className='view-more'>
                                    <Button onClick={() => history.push(`/movies/${imdbID}/reviews`)} color='warning'>Details </Button>
                                </div>
                            </div>
                            <p><span className='text-bold'>Released:</span>  {Released}</p>
                            <p><span className='text-bold'>Actors:</span>  {Actors}</p>
                        </div>
                        <div className='ratings'>
                            <div className='imdb-review'>
                                <div className='critic-score'>
                                    <img src="https://www.flaticon.com/svg/static/icons/svg/889/889118.svg" alt="imdb-icon" width='75px' />
                                    <p>{this.calculateImdbRating()}</p>
                                </div>
                                <div className='total'>
                                    {imdbVotes ?    imdbVotes + ` Critic Votes` : ''}
                                </div>
                            </div>
                            <div className='fan-review'>
                                <div className='fan-score'>
                                    {this.determineRatingImage()}
                                    <p>  {this.calculateAudienceRating()}</p>
                                </div>
                                <div className='total'>
                                    {this.determineAudienceRatingText()}
                                    {/* {fanreviews ? `${fanreviews.length} Fan ${this.determineIfPlural()}` : 'Be First to Review!'} */}
                                </div>
                            </div>     
                        </div>
                    </div>   
                </div>    
            </div>
        )
    }   
}

export default withRouter(PrivateMovie);