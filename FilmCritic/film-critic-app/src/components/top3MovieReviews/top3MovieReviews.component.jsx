import React from 'react';
import {
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
import './top3MovieReviews.styles.scss';

class Top3MovieReviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imdbRating: 0,
            audienceRating: 0
        }
        this.calculateImdbRating = this.calculateImdbRating.bind(this);
        this.calculateAudienceRating = this.calculateAudienceRating.bind(this);
        this.calculateAudienceReviewLength = this.calculateAudienceReviewLength.bind(this);
        this.calculatePluralTense = this.calculatePluralTense.bind(this);
        this.determineRatingImage = this.determineRatingImage.bind(this);
        this.timer = this.timer.bind(this)
    }

    componentDidMount() {
        this.mounted = true;
        this.timer()
    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.timer)
    }

    timer() {
        const {imdbRating} = this.props;
        const audienceScore = this.calculateAudienceRating()
        setTimeout(() => {
            (this.mounted &&  
                this.setState({imdbRating: (parseFloat(imdbRating)/10 * 100).toFixed(0),
                    audienceRating: audienceScore
                }))   
        }, 0)
    }

    calculateImdbRating() {
        const {imdbRating} = this.props;
        return (parseFloat(imdbRating)/10 * 100).toFixed(0);       
    }

    calculateAudienceRating() {
        const {averagefanscore } = this.props;
        if(averagefanscore) {
            const percentageScore = (parseFloat(averagefanscore)/5 * 100).toFixed(0);
            return percentageScore;
        } 
        return 0;  
    }

    calculateAudienceReviewLength() {
        const {fanreviews } = this.props
        if(fanreviews.length === 1) {
            return `${fanreviews.length}`
        } 
        return `${fanreviews.length}`
    }

    calculatePluralTense() {
        const { fanreviews } = this.props;
        if(fanreviews.length === 1) {
            return `Fan Review`
        } 
        return `Fan Reviews`
    }

    determineRatingImage() {
        const {averagefanscore} = this.props;
        let imgSrc;
        if(averagefanscore) {
            const score = (parseFloat(averagefanscore)/5 * 100).toFixed(0)
            if(score > 0 && score < 70) {
                // https://www.flaticon.com/free-icon/dislike_1301458
                // Freepik
                imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/1301/1301458.svg';
            } else if (score == 0){
                imgSrc= 'https://www.flaticon.com/svg/static/icons/svg/942/942751.svg'
            } else if (score >= 70 && score < 90) {
                // https://www.flaticon.com/free-icon/like_1301447?term=like%201301447&page=1&position=1
                // Freepik
                imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/1301/1301447.svg'
            } else if (score >= 90) {
                // https://www.flaticon.com/free-icon/star_616655?term=star&page=1&position=15
                // Freepik
                imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/616/616655.svg'
            } 
            return imgSrc
        }
        // https://www.flaticon.com/free-icon/conversation_942751?term=942751&page=1&position=1
        // Freepik
        imgSrc= 'https://www.flaticon.com/svg/static/icons/svg/942/942751.svg'
        return imgSrc
    }

    render() {
        const {imdbVotes, Poster, fanreviews} = this.props;
        return (
            <div className='Top3MovieReviews'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-6'>
                        <div className='Movie-Img d-flex flex-column align-items-center'>
                            <img src={Poster} alt="movie" width='120'/>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='d-flex flex-column'>
                            <div className='Critic d-flex flex-column justify-content-center align-items-center'>
                                <div className='rating'>
                                    <div style={{width: '80px', height: '80px'}}>
                                        <CircularProgressbarWithChildren 
                                            value={this.state.imdbRating}
                                            strokeWidth= {11}
                                            styles={buildStyles({
                                                rotation: 0,
                                                strokeLinecap: 'round',
                                                pathTransitionDuration: 1,
                                                pathColor: `rgba(240,138,93, ${this.state.imdbRating / 100})`,
                                                textColor: '#f88',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        >
                                            {/* https://www.flaticon.com/free-icon/imdb_889118?term=imdb&page=1&position=3 */}
                                            {/* Pixel Perfect */}
                                            <img style={{ width: 45, marginTop: -7}} src='https://www.flaticon.com/svg/static/icons/svg/889/889118.svg' alt="rating" />
                                            <div style={{ fontSize: 13, marginTop: -10 }}>
                                                {this.state.imdbRating}%
                                            </div>
                                        </CircularProgressbarWithChildren>
                                    </div>
                                </div>
                                {/* <div className='label'><span className='text-bold'>{imdbVotes}</span>&nbsp;Votes</div> */}
                            </div>
                            <div className='Audience d-flex flex-column justify-content-center align-items-center mt-2'>
                                <div className='rating'>   
                                    <div style={{width: '80px', height: '80px'}}>
                                        <CircularProgressbarWithChildren 
                                            value={this.state.audienceRating}
                                            strokeWidth= {11}
                                            styles={buildStyles({
                                                rotation: 0,
                                                strokeLinecap: 'round',
                                                pathTransitionDuration: 1,
                                                pathColor: `rgba(62, 152, 199, ${this.calculateAudienceRating() / 100})`,
                                                textColor: '#f88',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        >
                                            <img style={{ width: 35, marginTop: 0}} src={`${this.determineRatingImage()}`} alt="rating" />
                                            <div className='percent' style={{ fontSize: 13, marginTop: 0 }}>
                                                {this.calculateAudienceRating() == 0 ? '' : this.calculateAudienceRating() + '%'}
                                            </div> 
                                        </CircularProgressbarWithChildren>
                                    </div>
                                </div>
                                {/* <div className='label'>
                                    {fanreviews.length>0 ? <div><span className='text-bold-audience'>{this.calculateAudienceReviewLength() } </span> {this.calculatePluralTense()}</div>: 'No Reviews'}    
                                </div> */}
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default Top3MovieReviews;