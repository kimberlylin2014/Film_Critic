import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsMovieListLoading} from '../../redux/movie/movie.selectors'
import DetailedMovieInfo from'./detailedMovieInfo.component';
import WithSpinner from '../withSpinner/withSpinner.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsMovieListLoading
})

const DetailedMovieInfoContainer = connect(mapStateToProps)(WithSpinner(DetailedMovieInfo, '200px'))

export default DetailedMovieInfoContainer;