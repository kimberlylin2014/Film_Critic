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
    }

    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleMovieSearchButton() {
        const { movieSearch } = this.state;
        const { getMovieSearchStart } = this.props;
        getMovieSearchStart(movieSearch);
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