import React from 'react';
import './detailedMovieRatings.styles.scss';
import  FanReviewModal  from '../fanReviewModal/fanReviewModal.component';

import 'react-circular-progressbar/dist/styles.css';

class DetailedMovieRatings extends React.Component  {
    constructor(props) {
        super(props)
        this.calculateImdbRating = this.calculateImdbRating.bind(this)
        this.calculateAudienceRating = this.calculateAudienceRating.bind(this)
        this.determineRatingImage = this.determineRatingImage.bind(this);
        this.calculateAudienceReviewLength = this.calculateAudienceReviewLength.bind(this)
        this.displayReviewButton = this.displayReviewButton.bind(this);
    }

    calculateImdbRating() {
        const {imdbRating} = this.props;
        return `${(parseFloat(imdbRating)/10 * 100).toFixed(0)}%`
    }

    calculateAudienceRating() {
        const {averageFanScore } = this.props;
        if(averageFanScore) {
            const percentageScore = (parseFloat(averageFanScore)/5 * 100).toFixed(0);
            return percentageScore;
        } 
        return null;  
    }

    calculateAudienceReviewLength() {
        const {moreReviewInfo} = this.props;
        if(moreReviewInfo) {
            const data = moreReviewInfo[0];
            const { fanreviews } = data;
            if(fanreviews.length === 1) {
                return `${fanreviews.length} Review`
            } 
            return `${fanreviews.length} Reviews`
        }
        return null;
    }

    displayReviewButton() {
        const {moreReviewInfo, currentUser} = this.props;
        if(moreReviewInfo) {
            const userAlreadyReviewed = moreReviewInfo.find(review => review.userid === currentUser.id);
            if(!userAlreadyReviewed) {
                return <div><FanReviewModal buttonLabel='Write A Review' className={`review-modal`} {...this.props}/></div> 
            }
            return '';
        }

     return  <div><FanReviewModal buttonLabel='Write A Review' className={`review-modal`} {...this.props}/></div> 
    } 

    determineRatingImage() {
        const {averageFanScore} = this.props;
        let imgSrc;
        if(averageFanScore) {
            const score = (parseFloat(averageFanScore)/5 * 100).toFixed(0)
            if(score >= 0 && score < 70) {
                imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/1301/1301458.svg';
            } else if (score >= 70 && score < 90) {
                imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/1301/1301447.svg'
            } else if (score >= 90) {
                imgSrc = 'https://www.flaticon.com/svg/static/icons/svg/616/616490.svg'
            } 
            return imgSrc
        }
        imgSrc= 'https://www.flaticon.com/svg/static/icons/svg/942/942751.svg'
        return imgSrc
    }

    render() {
        const {moreReviewInfo} = this.props;
        return (
            <div className='DetailedMovieRatings'>
                <div className='Critic'>
                    <div className='rating'>
                        <img src="https://www.flaticon.com/svg/static/icons/svg/889/889118.svg" alt="imdb-icon" width='90px'/>
                        {this.calculateImdbRating()}
                    </div>
                    <div className='label'>
                        IMDB 
                    </div>
                </div>
                <div className='Audience'>
                    <div className='rating'>
                        {moreReviewInfo ? (
          
                            <img src={this.determineRatingImage()} alt="audience-icon" width='70px'/> 
                        ): (
                            <img src={this.determineRatingImage()} alt="audience-icon" width='70px'/> 
                        )} 

                        {moreReviewInfo ? (
                            <div>
                                    {this.calculateAudienceRating()}%
                            </div>
                          
                        ): ''}      
                    </div>
                    <div className='label'>
                        {moreReviewInfo ? (
                            <div>
                                    {this.calculateAudienceReviewLength()}
                            </div>
                          
                        ): 'No Reviews'}    
                    </div>
                </div>
                {this.displayReviewButton()}  
        </div>
        )
    }
}

export default DetailedMovieRatings;