import React from 'react';
import './accessPrivatePageModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class AccessPrivatePageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }
        this.toggle = this.toggle.bind(this)
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this)
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
                             <p> Login or Register to have access to the following features:</p>
                             <ul>
                                 <li>Write movie reviews</li>
                                 <li>Rate movie scores</li>
                                 <li>See movie ratings by IMDB Critics and other Users</li>
                                 <li>Read more details about each movie</li>
                             </ul>
                         </div>
                         <div className='options'>
                             <div>
                                 First Time User?  <button className='btn btn-sm btn-warning' onClick={this.handleRegister}>Register</button>
                             </div>
                            <div>
                                Have an Account?  <button className='btn btn-sm btn-warning' onClick={this.handleLogin}>Login</button>
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