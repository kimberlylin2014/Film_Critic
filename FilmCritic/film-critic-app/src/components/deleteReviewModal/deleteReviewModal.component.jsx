import React from 'react';
import './deleteReviewModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteReviewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }
        this.toggle = this.toggle.bind(this)
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    }

    toggle() {
        this.setState((currState) =>{
            return {
                modal: !currState.modal
            }
        })
    }

    handleDeleteSubmit() {
        const {imdbID, currentUser, id, deleteReviewStart} = this.props;
        const token = window.sessionStorage.getItem('token');
        const deleteReviewObj = {
            userID: currentUser.id,
            imdbID: imdbID,
            token: token,
            reviewID: id
        } 
        deleteReviewStart(deleteReviewObj)
        this.toggle();
    }

    render() {
        const {label, Title} = this.props;
        return(
            <div>
                <Button onClick={this.toggle}> {label} </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Your Review</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete your review for <strong>{Title}</strong> ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={this.handleDeleteSubmit}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default DeleteReviewModal;