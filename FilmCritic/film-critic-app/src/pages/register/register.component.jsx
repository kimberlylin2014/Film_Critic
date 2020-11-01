import React from 'react';
import RegisterFormContainer from '../../components/registerForm/registerForm.container';
import './register.styles.scss';
import  { connect } from 'react-redux';
import { registerUserStart, registerUserFailure, resetUser } from '../../redux/user/user.actions';
import {selectUserErrorMessage, selectIsUserLoading} from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {resetUser} = this.props;
        window.sessionStorage.removeItem("token");
        resetUser();
    }

    render() {
        return (
            <div className='Register'>
                <div className='container'>
                    <div className='row justify-content-center'>
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
        registerUserFailure: (error) => dispatch(registerUserFailure(error)),
        resetUser: ()=> dispatch(resetUser())
    }
}

const mapStateToProps = createStructuredSelector({
    errorMessage: selectUserErrorMessage,
    isUserLoading: selectIsUserLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);