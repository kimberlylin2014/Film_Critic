import React from 'react';
import { Button, Form, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';
import FormInput from '../formInput/formInput.component';
import './registerForm.styles.scss'
import ValidationMessage from '../validationMessage/validationMessage.component';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleAlreadyUserClick = this.handleAlreadyUserClick.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }
    
    handleOnChange(e) {
        this.setState({formErrorMessageDisplay: null, formErrorMessage: null});
        const { name, value } = e.target;
        if(name === 'password' || name === 'email') {
            this.setState({
                [name] : value
            })
        } else if(name === 'username' ) {
            this.setState({
                email: value,
                username: value
            })
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.setState({formErrorMessageDisplay: null, formErrorMessage: null});
        let { email, password, username } = this.state;
        const {registerUserStart, registerUserFailure} = this.props;
        if(username.length < 3 || username.length > 10 || password.length !== 4 ) {
            registerUserFailure("Username needs to be 3-10 characters and password needs to be 4 characters.")
        }else {
            console.log(typeof(password))
            this.setState({formErrorMessageDisplay: null});
            email += "@filmcritic.com"
            registerUserStart({email, password, username})
        }
    }

    handleAlreadyUserClick(e) {
        e.preventDefault()
        const { history } = this.props;
        history.push('/login')
    }
    
    handleOnKeyPress(e) {
        if(e.key === 'Enter') {
            this.handleOnSubmit(e);
        }
    }

    render() {
        const {errorMessage, isUserLoading} = this.props;
        return(
            <div className='RegisterForm'>
                <Form>
                    <h3 className='text-center'>Register</h3>
                    <FormInput 
                        label='Username'
                        id='username'
                        type='text'
                        name='username'
                        placeholder='3-10 characters'                    
                        onChange = {this.handleOnChange}
                        value={this.state.username}
                    />
                    <label htmlFor="email">Email</label>
                    <InputGroup className='mb-3'>
                        <Input placeholder="3-10 characters" 
                                id='email'
                                type='text'
                                name='email'                  
                                onChange = {this.handleOnChange}
                                value={this.state.email}
                        />
                        <InputGroupAddon addonType="append">
                        <InputGroupText>@filmcritic.com</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                     <FormInput 
                        label='Create Password'
                        id='password'
                        type='password'
                        name='password'
                        placeholder='4 characters'                    
                        onChange = {this.handleOnChange}
                        onKeyPress = {this.handleOnKeyPress}
                    />
                     {errorMessage ? <ValidationMessage colorCode='#363636' message={errorMessage}/> : ''}
                     <div className='mt-4'>
                        <Button onClick={this.handleOnSubmit} disabled={isUserLoading}>Submit</Button>
                        <Button className='already-user-btn' onClick={this.handleAlreadyUserClick}> Already Have an Account </Button>
                     </div>
                </Form>
            </div>
        )
    }
}

export default RegisterForm;