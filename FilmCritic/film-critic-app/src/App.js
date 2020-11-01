import React, {lazy, Suspense} from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { selectSessionExpireWarning } from './redux/movie/movie.selectors';
import SpinnerLazy from './components/spinnerLazy/spinnerLazy.component';
import ErrorBoundary from './components/errorBoundary/errorBoundary.component';
const NotFoundPage = lazy(() => import('./pages/notFoundPage/notFoundPage.component'));
const Register = lazy(() => import('./pages/register/register.component'));
const PrivateHome = lazy(() => import('./pages/privateHome/privateHome.component'));
const PublicHome = lazy(() => import('./pages/publicHome/publicHome.component'));
const SingleMoviePage = lazy(() => import('./pages/singleMoviePage/singleMoviePage.component'));
const Login = lazy(() => import('./pages/login/login.component'));
const Header = lazy(() => import('./components/header/header.component'));
const Footer = lazy(() => import('./components/footer/footer.component'));
const SessionExpireModal = lazy(() => import('./components/sessionExpireModal/sessionExpireModal.component'));

class App extends React.Component {
  render() {
    const { currentUser, sessionExpireWarning } = this.props;
    return (
      <div className='App'>
          <ErrorBoundary >
          {/* <SpinnerLazy height='200px' color='dark'/> */}
          <Suspense fallback={<p></p>}>
            <Header />
            {sessionExpireWarning ? <SessionExpireModal/> : ''}
            <Switch>
                <Route exact path='/' render={() => {
                  return currentUser ? <Redirect to='/home'/> :  <PublicHome />
                }}
                />
                <Route exact path='/register' render={(props) => {
                  return currentUser ? <Redirect to='/home'/>:  <Register {...props} />
                }}/>
                <Route exact path='/login' render={(props) => {
                  return currentUser ? <Redirect to='/home' /> :  <Login {...props} />
                }}/>
                <Route exact path='/home' render={() => {
                  return currentUser ? <PrivateHome /> :  <Redirect to='/login'/>
                }}/>
                <Route exact path='/movies/:imdbID/reviews' render={(props) => {
                  return currentUser ? <SingleMoviePage {...props}/> :  <Redirect to='/login'/>
                }} 
                />
                <Route component={NotFoundPage} />
            </Switch>
            <Footer />
          </Suspense>
          </ErrorBoundary>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  sessionExpireWarning: selectSessionExpireWarning
})

export default connect(mapStateToProps)(App);
