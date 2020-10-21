import React from 'react';
import { Spinner } from 'reactstrap';
import './spinnerLazy.styles.scss';

const SpinnerLazy = ({height, color}) => {
    return (
        <div className='SpinnerLazy' style={{height: height}}>
            <Spinner style={{ width: '5rem', height: '5rem' }} color={color} />
        </div>
    )
}

export default SpinnerLazy;
