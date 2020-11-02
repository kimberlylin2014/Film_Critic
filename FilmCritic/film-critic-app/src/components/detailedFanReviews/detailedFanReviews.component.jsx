import React from 'react';
import './detailedFanReviews.styles.scss';
import ReviewContainer from '../review/review.container';
import FanReviewModal  from '../fanReviewModal/fanReviewModal.component';

class DetailedFanReviews  extends React.Component{
    constructor(props) {
        super(props)
        this.displayReviewButton = this.displayReviewButton.bind(this);
        this.displayReviews = this.displayReviews.bind(this);
    }

    displayReviewButton() {
        const {moreReviewInfo, currentUser} = this.props;
        if(moreReviewInfo) {
            const userAlreadyReviewed = moreReviewInfo.find(review => review.userid === currentUser.id);
            if(!userAlreadyReviewed) {
                return <div><FanReviewModal buttonLabel='Write a Review!' className={`review-modal`} {...this.props}/></div> 
            }
            return '';
        }
        return  <div><FanReviewModal buttonLabel='Write a Review!' className={`review-modal`} {...this.props}/></div> 
    } 

    displayReviews() {
        const {moreReviewInfo} = this.props;
        let reviews;
        if(moreReviewInfo) {
            const sortedReviews = moreReviewInfo.sort((a,b) => {
                return parseFloat(a.id) - parseFloat(b.id)
            })
            reviews = 
                <div className='row'>
                    {sortedReviews.map(review => 
                        <div className='col-lg-6 col-md-12' key={review.userid}>
                            <ReviewContainer {...review} {...this.props} key={review.userid}/>
                        </div>)
                    }
                    
                </div>;
            return reviews;
        }
        reviews = <p className='no-reviews'>No Fan Reviews At This Moment</p>
        return reviews;
    }

    render() {
        return (
            <div className='DetailedFanReviews'>
                <div className='review-btn'>
                    <h3>FAN REVIEWS</h3>
                    {this.displayReviewButton()}  
                </div> 
                <hr/>
                {this.displayReviews()}
            </div>
        )
    }   
}

export default DetailedFanReviews;