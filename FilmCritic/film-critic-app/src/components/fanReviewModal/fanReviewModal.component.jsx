import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import FormInput from '../formInput/formInput.component';
import ValidationMessage from '../validationMessage/validationMessage.component';

class FanReviewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            reviewText: '',
            fanScore: "1",
            errorMessageDisplay: null,
            errorMessage: null
        }
        this.toggle = this.toggle.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
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

    handleReviewSubmit() {
        if (this.state.reviewText.length < 5 ) {
            this.setState({errorMessageDisplay: true, errorMessage: "You need a minimum of 5 characters."})                                                                                                                                                                                                              
        } else if(this.state.reviewText.length > 500 ) {
            this.setState({errorMessageDisplay: true, errorMessage: "You went over the maximum of 500 characters."})
        } else {
            this.setState({errorMessageDisplay: null, errorMessage: null})
            const { reviewText, fanScore } = this.state;
            const {imdbID, submitMovieReviewStart, currentUser } = this.props;
            const token = window.sessionStorage.getItem('token');
            const reviewObjDB = {
                review: reviewText,
                userID: currentUser.id,
                score: fanScore,
                imdbID: imdbID,
                token: token
            }
            submitMovieReviewStart(reviewObjDB)
            this.toggle();
        }
    }

  render(){
    const { buttonLabel, className } = this.props;
    return (
        <div>
          <Button color="warning" onClick={this.toggle}>{buttonLabel}</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={className}>
            <ModalHeader toggle={this.toggle}>Your Review</ModalHeader>
            <ModalBody>
                <form>
                    {this.state.errorMessageDisplay ? <ValidationMessage 
                            message={this.state.errorMessage}
                            color='#ffa62b'
                    /> : ''}
                    <FormInput 
                        id='reviewText'
                        label='Write Your Review Here'
                        name='reviewText'
                        type='textarea'
                        onChange={this.handleOnChange}
                    />
      
                    <FormGroup>
                        <Label for="exampleSelect">Rate: </Label>
                        <Input type="select" name="fanScore" id="select" onChange={this.handleOnChange}>
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
              <Button color="warning" onClick={this.handleReviewSubmit}>Submit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
  }
}

export default FanReviewModal;