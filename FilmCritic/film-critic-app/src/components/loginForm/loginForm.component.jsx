import React from 'react';
import { Button, Form, InputGroup, Input, InputGroupAddon, InputGroupText  } from 'reactstrap';
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
        this.handleLoginAsGuest = this.handleLoginAsGuest.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this)
    }
    
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name] : value
        })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        let { email, password } = this.state;
        const {loginUserStart} = this.props;
        console.log(typeof(password))
        email += "@filmcritic.com"
        loginUserStart({email, password})
    }

    handleLoginAsGuest() {
        const {loginUserStart} = this.props;
        const email = 'guest@filmcritic.com';
        const password = "1234";
        loginUserStart({email, password})
    }

    handleOnKeyPress(e) {
        if(e.key === 'Enter') {
            this.handleOnSubmit(e);
        }
    }
    
    render() {
        const {errorMessage, isUserLoading} = this.props;
        return(
            <div className='LoginForm'>
                <Form>
                    <h3 className='text-center'>Login</h3>
                    <label htmlFor="email">Email</label>
                    <InputGroup className='mb-3'>
                        <Input 
                            id='email'
                            type='text'
                            name='email'                  
                            onChange = {this.handleOnChange}
                        />
                        <InputGroupAddon addonType="append">
                        <InputGroupText>@filmcritic.com</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                     <FormInput 
                        label='Password'
                        id='password'
                        type='password'
                        name='password'                  
                        onChange = {this.handleOnChange}
                        onKeyPress = {this.handleOnKeyPress}
                    />
                    {errorMessage ? <ValidationMessage colorCode='#363636' message={errorMessage}/> : ''}
                    <Button onClick={this.handleOnSubmit} disabled={isUserLoading}>Submit</Button>
                    {/* <Button className='new-user-btn' onClick={this.handleNewUserClick}>Register</Button> */}
                    <Button className='new-user-btn guest-btn' color='info' onClick={this.handleLoginAsGuest}>LOGIN AS GUEST</Button>
                </Form>

            </div>
        )
    }
}

export default LoginForm;