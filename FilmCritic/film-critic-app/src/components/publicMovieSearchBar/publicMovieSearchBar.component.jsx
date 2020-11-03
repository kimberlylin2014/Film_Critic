import React from 'react';
import './publicMovieSearchBar.styles.scss'
import FormInput from '../formInput/formInput.component';
import { Button } from 'reactstrap';
import { getMovieSearchStart } from '../../redux/movie/movie.actions'
import {connect } from 'react-redux';
import { selectMovieErrorMessage, selectIsMovieListLoading } from '../../redux/movie/movie.selectors'
import { createStructuredSelector } from 'reselect';
import ValidationMessage from '../validationMessage/validationMessage.component';

class PublicMovieSearchBar extends React.Component {
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
        const { getMovieSearchStart } = this.props;
        getMovieSearchStart(movieSearch);
    }

    handleOnKeyPress(e) {
        if(e.key === 'Enter') {
            this.handleMovieSearchButton(e);
        }
    }

    render() {
        const { errorMessage, isMovieListLoading } = this.props;
        return (
            <div className='PublicMovieSearchBar'>
                <form>
                    <FormInput 
                        id='movie-search'
                        label='Search Movie'
                        name='movieSearch'
                        type='text'
                        placeholder='movie name'
                        onChange={this.handleOnChange}
                        onKeyPress = {this.handleOnKeyPress}
                    />
                    {errorMessage ? <ValidationMessage colorCode='#363636' message={errorMessage}/> : ''}
                    <Button onClick={this.handleMovieSearchButton} disabled={isMovieListLoading}>Search</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieSearchStart: (searchWords) => dispatch(getMovieSearchStart(searchWords))
    }
}

const mapStateToProps = createStructuredSelector({
    errorMessage: selectMovieErrorMessage,
    isMovieListLoading: selectIsMovieListLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicMovieSearchBar);