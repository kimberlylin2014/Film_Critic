import React from 'react';
import './detailedMovieRatings.styles.scss';
import {
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  
class DetailedMovieRatings extends React.Component  {
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

    // componentDidUpdate(prevProps) {
    //     if(this.props)

    // }

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
        const {averageFanScore } = this.props;
        if(averageFanScore) {
            const percentageScore = (parseFloat(averageFanScore)/5 * 100).toFixed(0);
            return percentageScore;
        } 
        return 0;  
    }

    calculateAudienceReviewLength() {
        const {moreReviewInfo} = this.props;
        if(moreReviewInfo) {
            const data = moreReviewInfo[0];
            const { fanreviews } = data;
            if(fanreviews.length === 1) {
                return `${fanreviews.length}`
            } 
            return `${fanreviews.length}`
        }
        return null;
    }

    calculatePluralTense() {
        const {moreReviewInfo} = this.props;
        if(moreReviewInfo) {
            const data = moreReviewInfo[0];
            const { fanreviews } = data;
            if(fanreviews.length === 1) {
                return `Fan Review`
            } 
            return `Fan Reviews`
        }
        return null;
    }

    determineRatingImage() {
        const {averageFanScore} = this.props;
        let imgSrc;
        if(averageFanScore) {
            const score = (parseFloat(averageFanScore)/5 * 100).toFixed(0)
            if(score >= 0 && score < 70) {
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
            } 
            return imgSrc
        }
        // https://www.flaticon.com/free-icon/conversation_942751?term=942751&page=1&position=1
        // Freepik
        imgSrc= 'https://www.flaticon.com/svg/static/icons/svg/942/942751.svg'
        return imgSrc
    }

    render() {
        const {moreReviewInfo, imdbVotes} = this.props;
        return (
            <div className='DetailedMovieRatings'>
                <div className='white-card'>
                    <div className='Critic'>
                        <div className='rating'>
                            <div style={{width: '110px', height: '110px'}}>
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
                                    <img style={{ width: 50, marginTop: 0}} src='https://www.flaticon.com/svg/static/icons/svg/889/889118.svg' alt="rating" />
                                    <div style={{ fontSize: 16, marginTop: -7 }}>
                                        {this.state.imdbRating}%
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                        <div className='label'><span className='text-bold'>{imdbVotes}</span>&nbsp;Votes</div>
                    </div>
                    <div className='Audience'>
                        <div className='rating'>   
                            <div style={{width: '110px', height: '110px'}}>
                                <CircularProgressbarWithChildren 
                                    // value={this.calculateAudienceRating()}
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
                                    <img style={{ width: 38, marginTop: 0}} src={`${this.determineRatingImage()}`} alt="rating" />
                                    <div className='percent' style={{ fontSize: 16, marginTop: 0 }}>
                                        {this.calculateAudienceRating() === 0 ? '' : this.calculateAudienceRating() + '%'}
                                    </div> 
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                        <div className='label'>
                            {moreReviewInfo ? <div><span className='text-bold-audience'>{this.calculateAudienceReviewLength() }</span> {this.calculatePluralTense()}</div>: 'No Reviews'}    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedMovieRatings;