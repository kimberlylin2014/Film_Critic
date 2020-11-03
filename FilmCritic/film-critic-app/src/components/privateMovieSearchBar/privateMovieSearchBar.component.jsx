import React from 'react';
import './privateMovieSearchBar.styles.scss';
import FormInput from '../formInput/formInput.component';
import ValidationMessage from '../validationMessage/validationMessage.component';
import { Button } from 'reactstrap';
import { getPrivateMovieSearchStart } from '../../redux/movie/movie.actions'
import {connect } from 'react-redux';
import { selectMovieErrorMessage, selectIsMovieListLoading } from '../../redux/movie/movie.selectors'
import { createStructuredSelector } from 'reselect'

class PrivateMovieSearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movieSearch: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleMovieSearchButton = this.handleMovieSearchButton.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleMovieSearchButton(e) {
        e.preventDefault();
        const { movieSearch } = this.state;
        const { getPrivateMovieSearchStart} = this.props;
        const token = window.sessionStorage.getItem('token');
        const searchObj = {
            token,
            movieSearch
        }
        getPrivateMovieSearchStart(searchObj);
    }

    handleOnKeyPress(e) {
        if(e.key === 'Enter') {
            this.handleMovieSearchButton(e);
        }
    }

    render() {
        const { errorMessage, isMovieListLoading } = this.props;
        return (
            <div className='PrivateMovieSearchBar'>
                <form>
                    <FormInput 
                        id='movie-search'
                        label='Movie Search'
                        name='movieSearch'
                        type='text'
                        placeholder='movie name'
                        onChange={this.handleOnChange}
                        onKeyPress = {this.handleOnKeyPress}
                    />
                    {errorMessage ? <ValidationMessage colorCode='#363636' message={errorMessage}/> : ''}  
                    <Button onClick={this.handleMovieSearchButton} outline color='secondary' disabled={isMovieListLoading} >Search</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPrivateMovieSearchStart: (searchObj) => dispatch(getPrivateMovieSearchStart(searchObj))
    }
}

const mapStateToProps = createStructuredSelector({
    errorMessage: selectMovieErrorMessage,
    isMovieListLoading: selectIsMovieListLoading
})


export default connect(mapStateToProps, mapDispatchToProps)(PrivateMovieSearchBar);