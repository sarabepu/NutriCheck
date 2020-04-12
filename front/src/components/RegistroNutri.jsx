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

function RegistroNutri(props) {


  const [username, setUsername] = useState("")
  const [nombre, setNombre] = useState("")

  const [apellido, setApellido] = useState("")

  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    let nutri = {
      user: { username, nombre, apellido, password, nutri: true }
    };
    console.log(nutri);
    postData('http://localhost:3000/user/new', nutri)
      .then((data) => {
        if (data.error) {
          //avisar al usuario del error
        }
        else {
          nutri = { username, password, nutri: true };
          postData('http://localhost:3000/login', nutri)
            .then((data) => props.setUser(data.user));
        }
      })
  };

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridNombre">
          <Form.Label>Nombres</Form.Label>
          <Form.Control type="text" placeholder="Nombres" onChange={e => setNombre(e.target.value)} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridApellido">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control type="text" placeholder="Apellidos" onChange={e => setApellido(e.target.value)} />
        </Form.Group>


      </Form.Row>
      <Button variant="primary" onClick={handleSubmit}>
        Registrarme
    </Button>
    </Form>
  );
}
export default RegistroNutri;