import React from 'react';
import './sessionExpireModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { logoutUserStart } from '../../redux/user/user.actions';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class SessionExpireModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
        }
        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggle() {
        this.setState((currState) =>{
            return {
                modal: !currState.modal
            }
        })
    }

    handleClick() {
        this.toggle();
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Session Time Out</ModalHeader>
                    <ModalBody>
                        <img src="https://www.flaticon.com/svg/static/icons/svg/2972/2972547.svg" alt="timeout" width='100px' className='mr-4'/>
                        Your session has expired. Please log back in.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={this.handleClick}>Got it</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUserStart: () => dispatch(logoutUserStart())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SessionExpireModal));