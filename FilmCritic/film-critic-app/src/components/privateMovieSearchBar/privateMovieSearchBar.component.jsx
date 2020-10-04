import React from 'react';
import FormInput from '../formInput/formInput.component';
import { Button } from 'reactstrap';
import { getPrivateMovieSearchStart } from '../../redux/movie/movie.actions'
import {connect } from 'react-redux';

class PrivateMovieSearchBar extends React.Component {
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
        const { getPrivateMovieSearchStart } = this.props;
        const token = window.sessionStorage.getItem('token');
        const searchObj = {
            token,
            movieSearch
        }
        getPrivateMovieSearchStart(searchObj);
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
        getPrivateMovieSearchStart: (searchObj) => dispatch(getPrivateMovieSearchStart(searchObj))
    }
}


export default connect(null, mapDispatchToProps)(PrivateMovieSearchBar);