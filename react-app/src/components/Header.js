import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import NavItemTo from './NavItemTo'

export default () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>Home</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItemTo eventKey={1} href="/sales">Vendas</NavItemTo>
      <NavItemTo eventKey={2} href="/products">Produtos</NavItemTo>
      <NavItemTo eventKey={3} href="/sellers">Vendedores</NavItemTo>
    </Nav>
  </Navbar>
)
