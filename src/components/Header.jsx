import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#">DevShowcase</Navbar.Brand>
        <div>
          <Button variant="primary" className="me-2">Login</Button>
          <Button variant="outline-light">Logout</Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
