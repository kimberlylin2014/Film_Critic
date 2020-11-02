import React from 'react';
import { Spinner } from 'reactstrap';
import './withSpinner.styles.scss';

const WithSpinner = (WrappedComponent, height) => {
    const componentWithSpinner = ({isLoading, ...props}) => {
        const {color} = props;
        return isLoading ? (
            <div className='PageWithSpinner' style={{height: height}}>
                <Spinner style={{ width: '5rem', height: '5rem' }} color={color} />
            </div>
        ) : (
            <WrappedComponent {...props}/>
        )
    }
    return componentWithSpinner;
}

export default WithSpinner;