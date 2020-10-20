import React from 'react';
import './singleMoviePage.styles.scss';
import { getReviewsByMovieIDStart, submitMovieReviewStart, updateReviewStart, deleteReviewStart} from '../../redux/movie/movie.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSingleMoviePage} from '../../redux/movie/movie.selectors';
import DetailedMovie from '../../components/detailedMovie/detailedMovie.component';


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
        const { movieList} = this.props;
        return(
            <div className='SingleMoviePage'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-10'>
                        {movieList.map( movie => {
                            return <DetailedMovie {...movie} {...this.props} key={movie.imdbID}/>
                        })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewsByMovieIDStart: (reviewObj) => dispatch(getReviewsByMovieIDStart(reviewObj)),
        submitMovieReviewStart: (review) => dispatch(submitMovieReviewStart(review)),
        updateReviewStart: (reviewObj) => dispatch(updateReviewStart(reviewObj)),
        deleteReviewStart: (reviewObj) => dispatch(deleteReviewStart(reviewObj))
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    movieList: selectSingleMoviePage
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleMoviePage);