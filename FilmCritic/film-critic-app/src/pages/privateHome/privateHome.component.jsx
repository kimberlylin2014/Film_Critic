import React from 'react';
import './privateHome.styles.scss';
import { getUserBlogStart } from '../../redux/user/user.actions';
import { submitMovieReviewStart } from '../../redux/movie/movie.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMovieList } from '../../redux/movie/movie.selectors';
import PrivateMovieSearchBar from '../../components/privateMovieSearchBar/privateMovieSearchBar.component';
import MovieList from '../../components/movieList/movieList.component';

class PrivateHome extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.debug('Home page mounting')
        const { getUserBlogStart, currentUser } = this.props;
        console.debug(currentUser)
        const token = window.sessionStorage.getItem('token');
        getUserBlogStart({currentUser, token});
    }
    render() {
        return (
            <div className='PrivateHome'>
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        <h1>PRIVATE PAGE</h1>
                        <PrivateMovieSearchBar />
                        <MovieList {...this.props} privateRoute={true}/>
                    </div>

                </div>
               
            </div>
        )
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserBlogStart: (accessBlogCredentials) => dispatch(getUserBlogStart(accessBlogCredentials)),
      submitMovieReviewStart: (review) => dispatch(submitMovieReviewStart(review))
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    movieList: selectMovieList
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateHome);