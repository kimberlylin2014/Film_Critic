import React from 'react';
import './privateHome.styles.scss';
import { submitMovieReviewStart, resetMovieSearch } from '../../redux/movie/movie.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMovieList, selectIsMovieListLoading } from '../../redux/movie/movie.selectors';
import PrivateMovieSearchBar from '../../components/privateMovieSearchBar/privateMovieSearchBar.component';
import MovieListContainer from '../../components/movieList/movieList.container';
import Top3BannerPrivate from '../../components/top3BannerPrivate/top3BannerPrivate.component';

class PrivateHome extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {resetMovieSearch } = this.props;
        resetMovieSearch();
    }

    render() {
        return (
            <div className='PrivateHome'>
                <div className='Top3BannerPrivate'>
                    <Top3BannerPrivate />
                </div>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-5'>
                            <PrivateMovieSearchBar />
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-lg-9'>
                            <MovieListContainer {...this.props} color='light' privateRoute={true}/>
                        </div>
                    </div>
                </div>    
            </div>
        )
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
      submitMovieReviewStart: (review) => dispatch(submitMovieReviewStart(review)),
      resetMovieSearch: () =>  dispatch(resetMovieSearch())
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    movieList: selectMovieList,
    isMovieListLoading: selectIsMovieListLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateHome);