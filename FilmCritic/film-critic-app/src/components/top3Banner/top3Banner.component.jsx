import React from 'react';
import './top3Banner.styles.scss';
import {connect} from 'react-redux';
import { getFavoriteMovieReviewsStart } from '../../redux/movie/movie.actions';
import { selectTopBanner } from '../../redux/movie/movie.selectors';
import { createStructuredSelector } from 'reselect';
import Top3MovieReviews from '../top3MovieReviews/top3MovieReviews.component';
import AccessPrivatePageModal from '../accessPrivatePageModal/accessPrivatePageModal.component';

class Top3Banner extends React.Component {
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
            <div className='Top3Banner'>             
                <div className='row justify-content-center align-items-center'>
                    <div className='col-lg-2 col-md-12 text-center'>
                        <h2 className='text-center'>POPULAR MOVIES</h2>
                        <AccessPrivatePageModal label='Write A Movie Review!' {...this.props} />
                    </div>
                    {top3.map(movieData => {
                        console.log(movieData)
                        return  <div className='col-md-12 col-lg-3'>
                            <Top3MovieReviews {...movieData} key={movieData.imdbID}/>
                        </div>
                    })}
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


export default connect(mapStateToProps, mapDispatchToProps)(Top3Banner);