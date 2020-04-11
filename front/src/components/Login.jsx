import React, { useState, useEffect } from "react";
import { Col, Form, Nav, Card, Row, Button, Container } from 'react-bootstrap';

//Método para hacer post con fetch
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function Login(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit=()=>{
    let paciente={username,password};
    console.log(paciente);
    postData('http://localhost:3000/login',paciente)
    .then((data)=>props.setUser(data.user));
  };

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Ingrese Username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
      </Form.Row>
      <Button variant="primary" onClick={handleSubmit}>
        Login
    </Button>
    </Form>
  );
}
export default Login;