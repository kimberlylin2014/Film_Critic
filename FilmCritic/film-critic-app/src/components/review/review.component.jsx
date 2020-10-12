import React from 'react';
import './review.styles.scss';
import EditReviewModal from '../editReviewModal/editReviewModal.component';

const Review = ({...props}) => {
        const {review, fanscore, username, userid, currentUser} = props;
        return(
            <div className='Review'>
                <p><span className='bold-text'>"</span> {review} <span className='bold-text'>"</span></p>
                <p><span className='bold-text'>Scored:</span>  {fanscore}/5</p> 
                <div className='footer'>
                    {userid === currentUser.id ? (
                        <div className='edit-delete'>
                                <EditReviewModal
                                        {...props}
                                        reviewText={review}
                                        fanScore={fanscore}
                                />
                                {/* <img src="https://www.flaticon.com/svg/static/icons/svg/103/103454.svg" alt="edit-icon" width='25px'/> */}
                          
       
                                <img src="https://www.flaticon.com/svg/static/icons/svg/1345/1345874.svg" alt="delete-icon" width='25px'/>
                       
                           
                        </div>
                    ): ''}  
                    <div>
                        <span className='bold-text'> -</span> <span className='username'>{username}</span> 
                    </div>
                </div>  
            </div>
        )

    
}

export default Review;