import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsMovieListLoading} from '../../redux/movie/movie.selectors'
import Review from './review.component';
import WithSpinner from '../withSpinner/withSpinner.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsMovieListLoading
})

const ReviewContainer = connect(mapStateToProps)(WithSpinner(Review, '200px'))

export default ReviewContainer;