import React from 'react';
import RegisterFormContainer from '../../components/registerForm/registerForm.container';
import './register.styles.scss';
import  { connect } from 'react-redux';
import { registerUserStart, registerUserFailure } from '../../redux/user/user.actions';
import {selectUserErrorMessage} from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.sessionStorage.removeItem("token");
    }

    render() {
        return (
            <div className='Register'>
                <div className='container'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-lg-5'>
                            <RegisterFormContainer {...this.props} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUserStart: (credentials) => dispatch(registerUserStart(credentials)),
        registerUserFailure: (error) => dispatch(registerUserFailure(error))
    }
}

const mapStateToProps = createStructuredSelector({
    errorMessage: selectUserErrorMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);