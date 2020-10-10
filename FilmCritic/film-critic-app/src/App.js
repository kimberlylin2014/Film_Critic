import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Register from './pages/register/register.component';
import PrivateHome from './pages/privateHome/privateHome.component';
import PublicHome from './pages/publicHome/publicHome.component';
import SingleMoviePage from './pages/singleMoviePage/singleMoviePage.component';
import Login from './pages/login/login.component';
import Header from './components/header/header.component';
import { loginUserStart } from  './redux/user/user.actions';
import  { connect } from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    console.debug('App Component Mounting')
  }
  render() {
    const { currentUser } = this.props;
    console.debug('Current User in App')
    console.debug(currentUser)
    return (
      <div className='App'>
        <Header />
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
              return currentUser ? <PrivateHome /> :  <Redirect to='/register'/>
            }}/>

            <Route exact path='/movies/:imdbID/reviews' render={(props) => {
              return currentUser ? <SingleMoviePage {...props}/> :  <Redirect to='/register'/>
            }}
            
            
            />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserStart: () => loginUserStart()
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
