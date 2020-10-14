import React from 'react';
import './validationMessage.styles.scss';

const ValidationMessage = ({...props}) => {
    const {colorCode, message} = props;
    return (
        <div className='ValidationMessage'>
            {/* https://www.flaticon.com/free-icon/warning_1199619 */}
            {/* Freepik */}
            <img src="https://www.flaticon.com/svg/static/icons/svg/1199/1199619.svg" alt="warning"/>
            <p style={{color: `${colorCode}`}}>{message}</p>
        </div>
    )
}

export default ValidationMessage;