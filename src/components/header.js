import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default () => (
  <Navbar inverse toggleNavKey={0} bsSize='small'>
    <NavBrand >
      <a href='#'>Twitch Redux</a>
    </NavBrand>
    <Nav right eventKey={0} bsSize='small'> {/* This is the eventKey referenced */}
      <LinkContainer to={`/`} activeClassName='active'>
        <NavItem eventKey={1} href='#' bsSize='small'>
          Channels
        </NavItem>
      </LinkContainer>
      <LinkContainer to={`/games`} activeClassName='active'>
        <NavItem eventKey={1} href='#' bsSize='small'>
          Games
        </NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);
