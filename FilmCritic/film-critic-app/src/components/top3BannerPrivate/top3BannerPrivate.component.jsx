import React from 'react';
import './top3BannerPrivate.styles.scss';
import {connect} from 'react-redux';
import { getFavoriteMovieReviewsStart } from '../../redux/movie/movie.actions';
import { selectTopBanner, selectIsMovieListLoading } from '../../redux/movie/movie.selectors';
import { createStructuredSelector } from 'reselect';
import Top3MovieReviewsPrivate from '../top3MovieReviewsPrivate/top3MovieReviewsPrivate.component';

class Top3BannerPrivate extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {getFavoriteMovieReviewsStart} = this.props;
        getFavoriteMovieReviewsStart();
    }

    render(){
        const {top3} = this.props;
        return(
            <div className='Top3BannerPrivate'>
                <div className='container'>
                    <div className='row justify-content-between align-items-center'>
                        <div className='col-lg-2 col-md-12'>
                        <h3 className='text-center'>POPULAR MOVIES</h3> 
                        </div>
                        
                        {top3.map(movieData => {
                            console.log(movieData)
                            return  <div className='col-md-12 col-lg-3'>
                                <Top3MovieReviewsPrivate {...movieData} key={movieData.imdbID}/>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteMovieReviewsStart: () =>  dispatch(getFavoriteMovieReviewsStart())
    }
}

const mapStateToProps = createStructuredSelector({
    top3: selectTopBanner
})


export default connect(mapStateToProps, mapDispatchToProps)(Top3BannerPrivate);