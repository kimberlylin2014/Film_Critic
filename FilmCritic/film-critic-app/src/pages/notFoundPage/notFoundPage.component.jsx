import React from 'react';
import './notFoundPage.styles.scss';

const NotFoundPage = () => {
    return (
        <div className='NotFoundPage'>
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-lg-8 d-flex flex-row align-items-center justify-content-center card'>
                        <img src="https://www.flaticon.com/svg/static/icons/svg/1476/1476773.svg" alt="404" width='100px'
                        style={{marginRight: "20px"}}
                        />
                       <h1>404 Error. Page Doesn't Exist.</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;