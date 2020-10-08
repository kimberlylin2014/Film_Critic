import React from 'react';
import './privateHome.styles.scss';
import { getUserBlogStart } from '../../redux/user/user.actions';
import { submitMovieReviewStart, resetMovieSearch } from '../../redux/movie/movie.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMovieList } from '../../redux/movie/movie.selectors';
import PrivateMovieSearchBar from '../../components/privateMovieSearchBar/privateMovieSearchBar.component';
import MovieListContainer from '../../components/movieList/movieList.container';

class PrivateHome extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.debug('Home page mounting')
        const { getUserBlogStart, resetMovieSearch, currentUser } = this.props;
        console.debug(currentUser)
        const token = window.sessionStorage.getItem('token');
        resetMovieSearch();
        // getUserBlogStart({currentUser, token});
    }
    render() {
        return (
            <div className='PrivateHome'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-5'>
                            <PrivateMovieSearchBar />
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-lg-9'>
                            <MovieListContainer {...this.props} privateRoute={true}/>
                        </div>
                    </div>
                </div>    
            </div>
        )
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserBlogStart: (accessBlogCredentials) => dispatch(getUserBlogStart(accessBlogCredentials)),
      submitMovieReviewStart: (review) => dispatch(submitMovieReviewStart(review)),
      resetMovieSearch: () => dispatch(resetMovieSearch())
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    movieList: selectMovieList
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateHome);