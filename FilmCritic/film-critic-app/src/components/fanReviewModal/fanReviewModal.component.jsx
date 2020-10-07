import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import FormInput from '../formInput/formInput.component';

class FanReviewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            reviewText: '',
            fanScore: "1"
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

  render(){
    const { buttonLabel, className } = this.props;
    return (
        <div>
          <Button color="info" onClick={this.toggle}>{buttonLabel}</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
                <form>
                    <FormInput 
                        id='reviewText'
                        label='Write Your Review Here'
                        name='reviewText'
                        type='textarea'
                        handleOnChange={this.handleOnChange}
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
              <Button color="primary" onClick={this.handleReviewSubmit}>Submit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
  }
}

export default FanReviewModal;