import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MainNavbar() {
  return (
    <Navbar bg='dark' expand='lg'>
      <Container>
        <Navbar.Brand>
          <Link className='text-light text-decoration-none' to='/'>
            Q&A
          </Link>{' '}
          |{' '}
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
