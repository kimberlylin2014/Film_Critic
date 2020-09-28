import React from 'react';
import { getReviewsByMovieIDStart} from '../../redux/movie/movie.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
class SingleMoviePage extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const {match: {params: {imdbID}},getReviewsByMovieIDStart, currentUser} = this.props;
        const token = window.sessionStorage.getItem('token');
        const reviewObj = {
            userID: currentUser.id,
            imdbID: imdbID,
            token: token
        }
        getReviewsByMovieIDStart(reviewObj);
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
        getReviewsByMovieIDStart: (reviewObj) => dispatch(getReviewsByMovieIDStart(reviewObj))
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleMoviePage);