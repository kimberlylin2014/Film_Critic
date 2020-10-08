import React from 'react';
import './validationMessage.styles.scss';

const ValidationMessage = ({...props}) => {
    const {colorCode, message} = props;
    console.log(message)
    return (
        <div className='ValidationMessage'>
            <img src="https://www.flaticon.com/svg/static/icons/svg/3593/3593551.svg" alt="warning"/>
            <p style={{color: `${colorCode}`}}>{message}</p>
        </div>
    )
}

export default ValidationMessage;