import React from 'react';
import './detailedFanReviews.styles.scss';
import Review from '../review/review.component';

const DetailedFanReviews = ({...props}) => {
    const {moreReviewInfo} = props;
    return (
        <div className='DetailedFanReviews'>
            <div className='row'>
                {moreReviewInfo ?  moreReviewInfo.map(review => 
                <div className='col-6' key={review.userid}>
                    {console.log(review)}
                    <Review {...review} {...props} />
                </div>
                )
            :  <div className='col-12'><p>No Fan Reviews At This Moment</p></div>  }
            </div>
        </div>
    )
}


export default DetailedFanReviews;