import React from 'react';
import './accessPrivatePageModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class AccessPrivatePageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }
        this.toggle = this.toggle.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginGuest = this.handleLoginGuest.bind(this);
    }

    toggle() {
        this.setState((currState) =>{
            return {
                modal: !currState.modal
            }
        })
    }

    handleRegister() {
        const {history} = this.props;
        history.push('/register');
        this.toggle();
    }

    handleLogin() {
        const {history} = this.props;
        history.push('/login');
        this.toggle();
    }

    handleLoginGuest() {
        const {history} = this.props;
        history.push('/login');
        this.toggle();
    }

    render() {
        const {label, history} = this.props;
        return(
            <div >
                <Button onClick={this.toggle}> {label} </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>FilmCritic App</ModalHeader>
                    <ModalBody>
                     <div className='AccessPrivatePageModal'>
                         <div className='details'>  
                             <p> Login or Register to Write A Movie Review!</p>
                         </div>
                         <div>
                            <div  className='options'>
                            <button className='btn btn-sm btn-warning' onClick={this.handleRegister}>Register</button> Create New Account 
                            </div>
                            <div  className='options'>
                                <button className='btn btn-sm btn-warning' onClick={this.handleLogin}>Login</button> Have Existing Account 
                            </div>        
                            <div  className='options'>
                                <button className='btn btn-sm btn-info' onClick={this.handleLoginGuest}>Guest</button>Login as Guest
                            </div>       
                         </div>
                     </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default withRouter(AccessPrivatePageModal);