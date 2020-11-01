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
        let { email, password } = this.state;
        const {loginUserStart} = this.props;
        email += "@filmcritic.com"
        loginUserStart({email, password})
    }

    handleNewUserClick(e) {
        e.preventDefault();
        const { history } = this.props;
        history.push('/register')
    }
    
    render() {
        const {errorMessage} = this.props;
        return(
            <div className='LoginForm'>
                <Form>
                    <h3 className='text-center'>Login</h3>
                    <label htmlFor="email">Email</label>
                    <InputGroup className='mb-3'>
                        <Input placeholder="username" 
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