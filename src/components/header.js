import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';

export default () => (
  <Navbar inverse toggleNavKey={0} bsSize='small'>
    <NavBrand >
      <Link to={`/`} activeClassName='active'>Twitch Redux</Link>
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
      <NavItem eventKey={1} href='#' bsSize='small'>
      </NavItem>
      <NavItem eventKey={1} href='#' bsSize='small'>
      </NavItem>
    </Nav>
  </Navbar>
);
