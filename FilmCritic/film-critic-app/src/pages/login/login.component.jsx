import React from 'react';
import LoginFormContainer from '../../components/loginForm/loginForm.container';
import './login.styles.scss';
import  { connect } from 'react-redux';
import { loginUserStart, resetUser  } from '../../redux/user/user.actions';
import { selectUserErrorMessage, selectIsUserLoading } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class Login extends React.Component {
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
            <div className='Login'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-5'>
                            <LoginFormContainer {...this.props} color='dark'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUserStart: (credentials) => dispatch(loginUserStart(credentials)),
        resetUser: ()=> dispatch(resetUser())
    }
}

const mapStateToProps = createStructuredSelector({
    errorMessage: selectUserErrorMessage,
    isUserLoading: selectIsUserLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);