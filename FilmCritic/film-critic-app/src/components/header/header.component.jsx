import React from 'react';
import './header.styles.scss';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { logoutUserStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {Link, withRouter} from 'react-router-dom';
import { resetMovieSearch } from '../../redux/movie/movie.actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  toggle() {
    this.setState((currState) => {
      return {
        isOpen: !currState.isOpen
      }
    })
  }

  handleSignOut() {
    const {logoutUserStart} = this.props;
    logoutUserStart();
  }

  render() {
    const {currentUser, history, resetMovieSearch} = this.props;
    return (
      <div className='Header'>
        <Navbar color="light" light expand="md">
            <div className='container'>
            <NavbarBrand>
              {/* https://www.flaticon.com/free-icon/popcorn_3132754?term=3132754&page=1&position=1 */}
              {/* Freepik */}
               <img src="https://www.flaticon.com/svg/static/icons/svg/3132/3132754.svg" alt="logo" width='30px'/>
               FilmCritic App
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
         
                <NavItem>
                  {currentUser ? <NavLink onClick={() => {
                    history.push('/home')
                    resetMovieSearch()
                  }}>New Search</NavLink> : <NavLink onClick={() => history.push('/')}>Search</NavLink>}
                </NavItem>
                <NavItem>
                  {currentUser ? <NavLink onClick={this.handleSignOut}>Sign Out</NavLink> : <NavLink onClick={() => history.push('/register')}>Register</NavLink>}
                </NavItem>
                <NavItem>
                  {currentUser ? '' :  <NavLink onClick={() => history.push('/login')}>Sign In</NavLink>}
                </NavItem>
                <NavbarText className='username'>
                  {currentUser ? `${currentUser.username.toUpperCase()}` : ''}
                </NavbarText>
              </Nav>
            </Collapse>
            </div>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logoutUserStart: () => dispatch(logoutUserStart()),
      resetMovieSearch: () => dispatch(resetMovieSearch())
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));