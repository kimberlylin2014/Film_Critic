import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors'
import RegisterForm from './registerForm.component';
import WithSpinner from '../withSpinner/withSpinner.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
})

const RegisterFormContainer = connect(mapStateToProps)(WithSpinner(RegisterForm, '200px'))

export default RegisterFormContainer;