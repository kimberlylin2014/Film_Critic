import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsMovieListLoading} from '../../redux/movie/movie.selectors'
import MovieList from './movieList.component';
import WithSpinner from '../withSpinner/withSpinner.component';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsMovieListLoading
})

const MovieListContainer = connect(mapStateToProps)(WithSpinner(MovieList, '200px'))

export default MovieListContainer;