import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <Navbar bg="secondary" variant="dark" className="mb-4">
      <Container className="flex justify-center items-center">
        <Navbar.Brand href="#" className="flex justify-center items-center w-full">
          <img
            src={logo}
            alt="SHAGELNI Logo"
            className="w-32 h-auto rounded-lg" // w-32 = 128px, adjust as needed
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;