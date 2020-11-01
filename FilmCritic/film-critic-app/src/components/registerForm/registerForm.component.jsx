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
    }
    
    handleOnChange(e) {
        this.setState({formErrorMessageDisplay: null, formErrorMessage: null});
        const { name, value } = e.target;
        if(name === 'password') {
            this.setState({
                [name] : value
            })
        } else if(name === 'username' || name === 'email') {
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
        if(username.length < 3 || username.length > 10 || password.length !== 4 || isNaN(parseInt(password))) {
            registerUserFailure("Username needs to be 3-10 characters and passcode needs to be 4 digit number.")
        }else {
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
    
    render() {
        const {errorMessage} = this.props;
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
                        label='Passcode'
                        id='password'
                        type='password'
                        name='password'
                        placeholder='4 Digit Number'                    
                        onChange = {this.handleOnChange}
                    />
                     {errorMessage ? <ValidationMessage colorCode='#363636' message={errorMessage}/> : ''}
                     <div className='mt-4'>
                        <Button onClick={this.handleOnSubmit}>Submit</Button>
                        <Button className='already-user-btn' onClick={this.handleAlreadyUserClick}> Already A User </Button>
                     </div>
                </Form>
            </div>
        )
    }
}

export default RegisterForm;