import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsMovieListLoading} from '../../redux/movie/movie.selectors'
import DetailedMovieRatings from './detailedMovieRatings.component';
import WithSpinner from '../withSpinner/withSpinner.component';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsMovieListLoading
})

const DetailedMovieRatingsContainer = connect(mapStateToProps)(WithSpinner(DetailedMovieRatings, '200px'))

export default DetailedMovieRatingsContainer;