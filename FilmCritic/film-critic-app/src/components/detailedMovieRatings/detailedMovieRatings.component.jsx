import React from 'react';
import './detailedMovieRatings.styles.scss';
import  FanReviewModal  from '../fanReviewModal/fanReviewModal.component';

class DetailedMovieRatings extends React.Component  {
    constructor(props) {
        super(props)
        this.calculateImdbRating = this.calculateImdbRating.bind(this)
        this.calculateAudienceRating = this.calculateAudienceRating.bind(this)
        this.displayReviewButton = this.displayReviewButton.bind(this);
        this.determineRatingImage = this.determineRatingImage.bind(this)
    }

    calculateImdbRating() {
        const {imdbRating} = this.props;
        return `${(parseFloat(imdbRating)/10 * 100).toFixed(0)}%`
    }

    calculateAudienceRating() {
        const {averageFanScore} = this.props;
        console.log(averageFanScore)
        if(averageFanScore) {
            return `${(parseFloat(averageFanScore)/5 * 100).toFixed(0)}%`
        } 
        return 'N/A'
    }

    displayReviewButton() {
        const {moreReviewInfo, currentUser} = this.props;
        if(moreReviewInfo) {
            console.log('testing')
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
        console.log(averageFanScore)
        const score = (parseFloat(averageFanScore)/5 * 100).toFixed(0)
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
                        {this.determineRatingImage()} 
                        <div>{this.calculateAudienceRating()}</div>
                    </div>
                    <div className='label'>
                        Audience 
                    </div>
                </div>
                {this.displayReviewButton()}  
        </div>
        )
    }
}

export default DetailedMovieRatings;