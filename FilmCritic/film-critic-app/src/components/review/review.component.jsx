import React from 'react';
import './review.styles.scss';
import EditReviewModal from '../editReviewModal/editReviewModal.component';
import DeleteReviewModal from '../deleteReviewModal/deleteReviewModal.component';


const Review = ({...props}) => {
        const {review, fanscore, username, userid, currentUser} = props;
        return(
            <div className='Review'>
                <p><span className='bold-text'>"</span> {review} <span className='bold-text'>"</span></p>
                <p><span className='bold-text'>Scored:</span>  {fanscore}/5</p> 
                <div className='footer d-flex justify-content-between'>
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
                    <div>
                        <div><span className='bold-text'> -</span> <span className='username'>{username}</span> </div>    
                    </div>
                </div>  
            </div>
        )
}



export default Review;