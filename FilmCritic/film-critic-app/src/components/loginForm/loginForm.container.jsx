import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors';
import LoginForm from './loginForm.component';
import WithSpinner from '../withSpinner/withSpinner.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
})

const LoginFormContainer = connect(mapStateToProps)(WithSpinner(LoginForm, '600px'))

export default LoginFormContainer;