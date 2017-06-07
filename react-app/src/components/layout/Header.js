import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import NavItemLinkTo from '../common/NavItemLinkTo'

export default () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>Home</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItemLinkTo eventKey={1} href="/sale">Venda</NavItemLinkTo>
    </Nav>
  </Navbar>
)
