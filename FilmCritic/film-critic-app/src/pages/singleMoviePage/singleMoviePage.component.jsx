import React from 'react';
import { getReviewsByMovieIDStart} from '../../redux/movie/movie.actions';
import { connect } from 'react-redux'
class SingleMoviePage extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // const {match: {params: {imdbID}, getReviewsByMovieIDStart}} = this.props;
        // getReviewsByMovieIDStart(imdbID);
    }
    render(){

        return(
            <div>
                <h1>SINGLE MOVIE PAGE</h1>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewsByMovieIDStart: (movieID) => dispatch(getReviewsByMovieIDStart(movieID))
    }
}

export default connect(null, mapDispatchToProps)(SingleMoviePage);