import React from 'react';
import './review.styles.scss';
import EditReviewModal from '../editReviewModal/editReviewModal.component';
import DeleteReviewModal from '../deleteReviewModal/deleteReviewModal.component';


const Review = ({...props}) => {
        const {review, fanscore, username, userid, currentUser} = props;
        return(
            <div className='Review'>
                <div className='text-right'> <span className='username'>{username.toUpperCase()}</span> </div> 
                <p><span className='bold-text'>Scored:</span> <span className='username'>{fanscore}/5</span> </p> 
                <div className='review-text'>
                    <p><span className='bold-text'></span> {review} <span className='bold-text'></span></p>
                </div>   
                <div className='footer'>
                    {userid === currentUser.id ? (
                        <div className='edit-delete'>
                                <EditReviewModal
                                    {...props}
                                    reviewText={review}
                                    fanScore={fanscore}
                                    label='Edit'
                                />                          
                                <DeleteReviewModal 
                                    {...props}
                                    label='Delete'
                                />
                        </div>
                    ): <div></div>}  
                </div>  
            </div>
        )
}



export default Review;