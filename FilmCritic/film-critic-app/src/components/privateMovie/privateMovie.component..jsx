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
        this.determinePoster = this.determinePoster.bind(this)
        this.displayProperTitleLength = this.displayProperTitleLength.bind(this)
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
            // https://www.flaticon.com/free-icon/dislike_1301458
            // Freepik
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/1301/1301458.svg';
        } else if (score >= 70 && score < 90) {
             // https://www.flaticon.com/free-icon/like_1301447?term=like%201301447&page=1&position=1
            // Freepik
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/1301/1301447.svg'
        } else if (score >= 90) {
             // https://www.flaticon.com/free-icon/star_616655?term=star&page=1&position=15
            // Freepik
            imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/616/616655.svg'
        } else  {
             // https://www.flaticon.com/free-icon/conversation_942751?term=942751&page=1&position=1
            // Freepik
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

    determinePoster() {
        const {Poster, Title} = this.props;
        if(Poster === 'N/A') {
            // Freepik
            return  <img src='https://www.flaticon.com/svg/static/icons/svg/20/20773.svg' alt={Title} width='100px' height='100px' style={{backgroundColor: '#84a9ac', padding: '0 30px'}}/>
        }
        return  <img src={Poster} alt={Title} width='220px' height='280px'/>
    }

    displayProperTitleLength() {
        const {Title} = this.props;
        if(Title.length > 40) {
            return Title.slice(0, 40) + '...'
        }
        return Title;
    }

    render() {
        const { Actors, Released, imdbVotes, imdbID, fanreviews, history} = this.props;
        return (
            <div className='PrivateMovie'>
                <div className='main-section'>
                    <div className='img'>
                        {this.determinePoster()}
                    </div>
                    <div className='details'>
                        <div className='top'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                <h3>{this.displayProperTitleLength()}</h3>
                                </div>
                                {/* <div  className='view-more'>
                                    <Button onClick={() => history.push(`/movies/${imdbID}/reviews`)} color='warning'>More!</Button>
                                </div> */}
                            </div>
                            <p><span className='text-bold'>Released:</span>  {Released}</p>
                            <p><span className='text-bold'>Actors:</span>  {Actors}</p>
                            <div  className='view-more'>
                                    <Button onClick={() => history.push(`/movies/${imdbID}/reviews`)} color='warning'>Click for More!</Button>
                                </div>
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