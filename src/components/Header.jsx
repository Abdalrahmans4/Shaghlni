import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container className="d-flex justify-content-between">
       <Navbar.Brand href="#">
<img
  src={logo}
  alt="SHAGELNI Logo"
  style={{ width: '120px', height: 'auto', borderRadius: '8px' }}
/>






</Navbar.Brand>
        {/* <div>
          <Button variant="outline-light" className="me-2">Login</Button>
          <Button variant="primary">Sign Up</Button>
        </div> */}
      </Container>
    </Navbar>
  );
};

export default Header;
