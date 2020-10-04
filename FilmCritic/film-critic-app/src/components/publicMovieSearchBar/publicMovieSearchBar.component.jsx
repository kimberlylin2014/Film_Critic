import React from 'react';
import FormInput from '../formInput/formInput.component';
import { Button } from 'reactstrap';
import { getMovieSearchStart } from '../../redux/movie/movie.actions'
import {connect } from 'react-redux';

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
        return (
            <div>
                <form>
                    <FormInput 
                        id='movie-search'
                        label='Search Movie'
                        name='movieSearch'
                        type='text'
                        placeholder='movie name'
                        handleOnChange={this.handleOnChange}
                    />
                    <Button onClick={this.handleMovieSearchButton}>Search</Button>
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


export default connect(null, mapDispatchToProps)(PublicMovieSearchBar);