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

function RegistroPaciente() {

  const [nombre, setNombre] = useState("")

  const handleSubmit=()=>{
    let paciente={nombre};
    console.log(paciente);
    postData('localhost:3000',paciente)
    .then((data)=>{})
  };

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingrese nombre" onChange={e => setNombre(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridApellido">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form.Row>
      <Button variant="primary" onClick={handleSubmit}>
        Registrarme
    </Button>
    </Form>
  );
}
export default RegistroPaciente;