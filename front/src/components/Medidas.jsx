import React, { useState } from "react";
import { Col, Form, Button, Card, Container } from "react-bootstrap";
import Confirmacion from "./Confirmacion";

//Método para hacer post con fetch
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function Medidas(props) {
  const [estatura, setEstatura] = useState(props.user.estatura);
  const [peso, setPeso] = useState(props.user.peso);
  const [cintura, setCintura] = useState(props.user.cintura);
  const [pantorrilla, setPantorrilla] = useState(props.user.pantorrilla);
  const [brazo, setBrazo] = useState(props.user.brazo);
  const [historial, setHistorial] = useState(props.user.historial);
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState([]);

  const updateHistory = (peso) => {
    let newHistorial = [...historial];

    const newEntry = {
      fecha: new Date(),
      peso: parseInt(peso),
    };
    console.log(JSON.stringify({ name: "historial", object: newHistorial }));
    let found = false;
    for (let i = 0; i < newHistorial.length && !found; i++) {
      const item = historial[i];
      const fecha = new Date(item.fecha);
      if (
        fecha.getFullYear() === newEntry.fecha.getFullYear() &&
        fecha.getMonth() === newEntry.fecha.getMonth()
      ) {
        newHistorial[i].peso = newEntry.peso;
        found = true;
      }
    }
    console.log(JSON.stringify({ name: "historial", object: newHistorial }));

    if (!found) newHistorial.push(newEntry);
    console.log(JSON.stringify({ name: "historial", object: newHistorial }));
    fetch(`http://localhost:3000/user/${props.user.username}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "historial", object: newHistorial }),
    }).then(() => {
      setHistorial(newHistorial);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let paciente = {
      filter: {
        username: props.user.username,
      },
      query: {
        estatura,
        peso,
        cintura,
        pantorrilla,
        brazo,
      },
    };
    postData("http://localhost:3000/user/update", paciente)
      .then((data) => {
        setMessage("Tus medidas se actualizaron correctamente! 😁");
        setModalShow(true);
        updateHistory(peso);
      })
      .catch(() => {
        setMessage(["Hubo un error al actualizar tus datos 😢"]);
        setModalShow(true);
      });
  };

  return (
    <Container className="sub-card">
      <Card>
        <Card.Header>Mis medidas</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPeso">
                <Form.Label>Peso (kg)</Form.Label>
                <Form.Control
                  type="number"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEstatura">
                <Form.Label>Estatura (m)</Form.Label>
                <Form.Control
                  type="number"
                  value={estatura}
                  onChange={(e) => setEstatura(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <span className="subtitle">Circunferencias </span>
            <br />
            <br />
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCintura">
                <Form.Label>Cintura (cm)</Form.Label>
                <Form.Control
                  type="number"
                  value={cintura}
                  onChange={(e) => setCintura(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPantorrilla">
                <Form.Label> Pantorrilla (cm)</Form.Label>
                <Form.Control
                  type="number"
                  value={pantorrilla}
                  onChange={(e) => setPantorrilla(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBrazo">
                <Form.Label> Brazo (cm)</Form.Label>
                <Form.Control
                  type="number"
                  value={brazo}
                  onChange={(e) => setBrazo(e.target.value)}
                />
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
      <Confirmacion
        message={message}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
}
export default Medidas;
