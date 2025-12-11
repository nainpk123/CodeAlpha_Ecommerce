import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">CodeAlpha Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="py-3">
        <Container>
          {/* This Outlet is where HomeScreen or ProductScreen will appear */}
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default App;