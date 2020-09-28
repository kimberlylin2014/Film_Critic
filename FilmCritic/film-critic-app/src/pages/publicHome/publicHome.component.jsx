import React from 'react';
import './publicHome.styles.scss';
import { getUserBlogStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMovieList } from '../../redux/movie/movie.selectors';
import MovieSearchBar from '../../components/movieSearchBar/movieSearchBar.component';
import MovieList from '../../components/movieList/movieList.component';

class PublicHome extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { getUserBlogStart, currentUser } = this.props;
        const token = window.sessionStorage.getItem('token');
        getUserBlogStart({currentUser, token});
    }
    render() {
        return (
            <div className='PublicHome'>
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        <h1>PUBLIC PAGE</h1>
                        <MovieSearchBar />
                        <MovieList {...this.props} privateRoute={false}/>
                    </div>

                </div>
               
            </div>
        )
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserBlogStart: (accessBlogCredentials) => dispatch(getUserBlogStart(accessBlogCredentials)) 
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    movieList: selectMovieList
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicHome);