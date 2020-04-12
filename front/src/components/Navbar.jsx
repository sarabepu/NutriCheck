import React from 'react';
import { Component } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


function NavBar () {
    return (<>
      <Navbar expand="lg" id="navbar-principal">
        <Navbar.Brand className="white-text" href="#home">Nutricheck</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="white-text" href="#home">Home</Nav.Link>
            <Nav.Link className="white-text" href="#link">Link</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>)
  
}

export default NavBar;