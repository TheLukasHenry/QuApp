import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MainNavbar() {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>HireTalk</Link> |{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link>
              <Link to='/'>Home</Link> |{' '}
            </Nav.Link>
            <Nav.Link>
              <Link to='features'>Features</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
