import React from 'react';
import { Component } from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import Login from "./Login";

function NavBar (props) {
  const logout= () =>{
    fetch("http://localhost:3000/logout")
    .then(props.setUser(null))
};
    return (<>
      <Navbar expand="lg" id="navbar-principal">
        <Navbar.Brand className="white-text" href="#home">Nutricheck</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="white-text" href="#home">Home</Nav.Link>
            <Nav.Link className="white-text" href="#link">Link</Nav.Link>
            
          
          </Nav>
          <Nav className="ml-auto">
            {!props.user? 
            <Login {...props}/>
            :
            <>
            <h3 className="white-text">Welcome {props.user.nombre} </h3>
            <Button className=" ml-sm-2" onClick={logout}>Logout</Button>
            </>
            }
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>)
  
}

export default NavBar;