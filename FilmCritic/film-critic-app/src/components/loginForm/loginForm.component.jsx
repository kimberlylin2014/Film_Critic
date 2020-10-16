import React from 'react';
import { Button, Form  } from 'reactstrap';
import FormInput from '../formInput/formInput.component';
import './loginForm.styles.scss';
import ValidationMessage from '../validationMessage/validationMessage.component';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleNewUserClick = this.handleNewUserClick.bind(this);
    }
    
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name] : value
        })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const {loginUserStart} = this.props;
        console.log("signing in ")
        loginUserStart({email, password})
    }

    handleNewUserClick(e) {
        e.preventDefault();
        const { history } = this.props;
        history.push('/')
    }
    
    render() {
        const {errorMessage} = this.props;
        return(
            <div className='LoginForm'>
                <Form>
                    <h3 className='text-center'>Login</h3>
                    <FormInput 
                        label='Email'
                        id='email'
                        type='email'
                        name='email'
                        placeholder='example@gmail.com'                    
                        onChange = {this.handleOnChange}
                    />
                     <FormInput 
                        label='Password'
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Create Password'                    
                        onChange = {this.handleOnChange}
                    />
                    {errorMessage ? <ValidationMessage colorCode='#363636' message={errorMessage}/> : ''}
                    <Button onClick={this.handleOnSubmit}>Submit</Button>
                    <Button className='new-user-btn' onClick={this.handleNewUserClick}>New User</Button>
                </Form>
            </div>
        )
    }
}

export default LoginForm;