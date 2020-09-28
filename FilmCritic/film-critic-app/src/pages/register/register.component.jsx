import React from 'react';
import RegisterForm from '../../components/registerForm/registerForm.component';
import './register.styles.scss';

import  { connect } from 'react-redux';
import { registerUserStart } from '../../redux/user/user.actions';

class Register extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        window.sessionStorage.removeItem("token");
        console.log('register page has removed user token')
    }
    render() {
        return (
            <div className='Register'>
                <div className='container'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-lg-5'>
                            <RegisterForm {...this.props} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUserStart: (credentials) => dispatch(registerUserStart(credentials))
    }
}

export default connect(null, mapDispatchToProps)(Register);