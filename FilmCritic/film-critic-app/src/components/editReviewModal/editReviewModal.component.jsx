import React from 'react';
import './editReviewModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import FormInput from '../formInput/formInput.component';

class EditMovieReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            reviewText: props.reviewText,
            fanScore: props.fanScore
        }
        this.toggle = this.toggle.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    }

    toggle() {
        this.setState((currState) =>{
            return {
                modal: !currState.modal
            }
        })
    }

    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleUpdateSubmit() {
        const { reviewText, fanScore } = this.state;
        const {imdbID, updateReviewStart, currentUser, id } = this.props;
        const token = window.sessionStorage.getItem('token');
        const updatedReviewObjDB = {
            review: reviewText,
            userID: currentUser.id,
            fanscore: fanScore,
            imdbID: imdbID,
            token: token,
            reviewID: id
        }
        console.log(updatedReviewObjDB);
        
        updateReviewStart(updatedReviewObjDB)
        this.toggle();
    }

    render() {

        return(
            <div>
                <Button onClick={this.toggle}> Edit </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Your Review</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormInput 
                                id='reviewText'
                                label='Write Your Review Here'
                                name='reviewText'
                                type='textarea'
                                handleOnChange={this.handleOnChange}
                                value={this.state.reviewText}
                            />
                            <FormGroup>
                                <Label for="exampleSelect">Rate: </Label>
                                <Input type="select" name="fanScore" id="select" onChange={this.handleOnChange} value={this.state.fanScore}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Input>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={this.handleUpdateSubmit}>Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

export default EditMovieReview;