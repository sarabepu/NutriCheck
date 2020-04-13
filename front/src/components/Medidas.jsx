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
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState([]);

  const updateHistory = (peso) => {
    let newHistorial = [...props.user.historial];

    const newEntry = {
      fecha: new Date(),
      peso: parseInt(peso),
    };
    let found = false;
    for (let i = 0; i < newHistorial.length && !found; i++) {
      const item = props.user.historial[i];
      const fecha = new Date(item.fecha);
      if (
        fecha.getFullYear() === newEntry.fecha.getFullYear() &&
        fecha.getMonth() === newEntry.fecha.getMonth() &&
        fecha.getDate() === newEntry.fecha.getDate()
      ) {
        newHistorial[i].peso = newEntry.peso;
        found = true;
      }
    }

    if (!found) newHistorial.push(newEntry);

    return fetch(`/user/${props.user.username}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "historial", object: newHistorial }),
    }).then(() => newHistorial);
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
    postData("/user/update", paciente)
      .then((data) => {
        setMessage("Tus medidas se actualizaron correctamente! 😁");
        setModalShow(true);
        updateHistory(peso).then((newHistory) => {
          props.setUser((user) => {
            let newUser = {};
            Object.assign(newUser, user);
            newUser.estatura = estatura;
            newUser.peso = peso;
            newUser.cintura = cintura;
            newUser.pantorrilla = pantorrilla;
            newUser.brazo = brazo;
            newUser.historial = newHistory;
            return newUser;
          });
        });
      })
      .catch(() => {
        setMessage(["Hubo un error al actualizar tus datos 😢"]);
        setModalShow(true);
      });
  };

  const clasificacion = () => {
    let imc = (peso / estatura ** 2).toFixed(2);
    if (imc < 16) return "Delgadez severa";
    else if (16 <= imc && imc < 17) return "Delgadez moderada";
    else if (17 <= imc && imc < 18.5) return "Delgadez aceptable";
    else if (18.5 <= imc && imc < 25) return "Peso normal";
    else if (25 <= imc && imc < 30) return "Sobrepeso";
    else if (30 <= imc && imc < 35) return "Obesidad tipo I";
    else if (35 <= imc && imc < 40) return "Obesidad tipo II";
    else if (40 <= imc && imc < 50) return "Obesidad tipo III";
    else if (50 <= imc) return "Obesidad tipo IV (extrema)";
  };

  return (
    <Container className="sub-card">
      <Card>
        <Card.Header className="font-match">Mis medidas</Card.Header>
        <Card.Body>
          <div className="card-content2">
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

              <div className="subtitle">Circunferencias </div>

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
              <br />
              <Form.Row>
                <Button variant="primary" type="submit">
                  Actualizar
                </Button>
              </Form.Row>
              <hr />
              <div className="subtitle"> Indice de masa corporal</div>

              <Form.Row>
                <Form.Group as={Col}>
                  <h5 className="mb-4">
                    {(peso / estatura ** 2).toFixed(2)}: {clasificacion()}
                  </h5>
                  <div id="formBasicRange">
                    <Form.Control
                      type="range"
                      value={(peso / estatura ** 2).toFixed(2)}
                      min={10}
                      max={50}
                      disabled
                    />
                  </div>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
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
