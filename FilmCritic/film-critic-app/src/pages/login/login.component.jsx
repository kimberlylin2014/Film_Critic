import React from 'react';
import LoginForm from '../../components/loginForm/loginForm.component';
import './login.styles.scss';

import  { connect } from 'react-redux';
import { loginUserStart } from '../../redux/user/user.actions';

class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        window.sessionStorage.removeItem("token");
        console.log('sign in page has removed user token')
    }
    render() {
        return (
            <div className='Login'>
                <div className='container'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-lg-5'>
                            <LoginForm {...this.props} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUserStart: (credentials) => dispatch(loginUserStart(credentials))
    }
}

export default connect(null, mapDispatchToProps)(Login);