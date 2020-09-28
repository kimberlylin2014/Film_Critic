import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logoutUserStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {Link, withRouter} from 'react-router-dom';

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
    const {currentUser, history} = this.props;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Tumblr</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {currentUser ? '' :  <NavLink onClick={() => history.push('/')}>Movies</NavLink>}
              </NavItem>
              <NavItem>
                {currentUser ? <NavLink onClick={this.handleSignOut}>Sign Out</NavLink> : <NavLink onClick={() => history.push('/register')}>Register</NavLink>}
              </NavItem>
              <NavItem>
                {currentUser ? '' :  <NavLink onClick={() => history.push('/login')}>Sign In</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logoutUserStart: () => dispatch(logoutUserStart())
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));