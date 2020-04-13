import React, { useState } from "react";
import { Col, Form, Button, Card, Container } from 'react-bootstrap';

//Método para hacer post con fetch
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
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

function Medidas(props) {



  const [estatura, setEstatura] = useState(props.user.estatura)
  const [peso, setPeso] = useState(props.user.peso)
  const [cintura, setCintura] = useState(props.user.cintura)
  const [pantorrilla, setPantorrilla] = useState(props.user.pantorrilla)
  const [brazo, setBrazo] = useState(props.user.brazo)





  const handleSubmit = (e) => {
    e.preventDefault()
    let paciente = {
      "filter": {
        username: props.user.username,

      },
      "query": {

        estatura,
        peso,
        cintura,
        pantorrilla,
        brazo
      }

    };
    console.log(paciente);
    postData('http://localhost:3000/user/update', paciente)
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Container className="sub-card">
      <Card>
        <Card.Header>
          Editar mis medidas
          </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>


            <Form.Row>
              <Form.Group as={Col} controlId="formGridPeso">
                <Form.Label>Peso (kg)</Form.Label>
                <Form.Control type="number" value={peso} onChange={e => setPeso(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEstatura">
                <Form.Label>Estatura (m)</Form.Label>
                <Form.Control type="number" value={estatura} onChange={e => setEstatura(e.target.value)} />
              </Form.Group>

            </Form.Row>

            <span className="subtitle">Circunferencias </span>
            <br />
            <br />
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCintura">
                <Form.Label>Cintura (cm)</Form.Label>
                <Form.Control type="number" value={cintura} onChange={e => setCintura(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPantorrilla">
                <Form.Label> Pantorrilla (cm)</Form.Label>
                <Form.Control type="number" value={pantorrilla} onChange={e => setPantorrilla(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBrazo">
                <Form.Label> Brazo (cm)</Form.Label>
                <Form.Control type="number" value={brazo} onChange={e => setBrazo(e.target.value)} />
              </Form.Group>

            </Form.Row>



            <Form.Row>
              <Button variant="primary" type="submit">
                Actualizar
    </Button>

            </Form.Row>

          </Form>

        </Card.Body>
      </Card>
    </Container>
  );
}
export default Medidas;