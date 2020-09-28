import React from 'react';
import { Button, Form  } from 'reactstrap';
import FormInput from '../formInput/formInput.component';
import './registerForm.styles.scss'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleAlreadyUserClick = this.handleAlreadyUserClick.bind(this);

    }
    
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name] : value
        })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const { email, password, username } = this.state;
        const {registerUserStart} = this.props;
        registerUserStart({email, password, username})
    }

    handleAlreadyUserClick(e) {
        e.preventDefault()
        const { history } = this.props;
        history.push('/login')
    }
    
    render() {
        return(
            <div className='RegisterForm'>
                <Form>
                    <h3 className='text-center'>Register</h3>
                    <FormInput 
                        label='Username'
                        id='username'
                        type='text'
                        name='username'
                        placeholder='kimberlylin'                    
                        handleOnChange = {this.handleOnChange}
                    />
                    <FormInput 
                        label='Email'
                        id='email'
                        type='email'
                        name='email'
                        placeholder='example@gmail.com'                    
                        handleOnChange = {this.handleOnChange}
                    />
                     <FormInput 
                        label='Password'
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Create Password'                    
                        handleOnChange = {this.handleOnChange}
                    />
                    <Button onClick={this.handleOnSubmit}>Submit</Button>
                    <Button className='already-user-btn' onClick={this.handleAlreadyUserClick}> Already A User </Button>
                </Form>
            </div>
        )
    }
}

export default RegisterForm;