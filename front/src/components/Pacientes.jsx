import React, { useState, useEffect } from "react";

import { Row, Col, Button, Container, Card } from "react-bootstrap";
import Paciente from "./Paciente";

function Pacientes(props) {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState(null);
  useEffect(() => {
    fetch(`/user/${props.user.username}/patients`)
      .then((res) => res.json())
      .then((res) => {
        setPacientes(res);
      });
  }, [props.user.username]);
  return (
    <Container>
      {paciente === null || (
        <Paciente id="paciente" paciente={paciente} setPaciente={setPaciente} />
      )}
      <Container className="main-container mb-5">
        <Container>
          <h1 className="white-text mt-5" align="center">
            Mis pacientes
          </h1>
        </Container>
        <br></br>
        <Row>
          {pacientes.map((p) => (
            <Container className="patient-card" key={p.username} as={Col}>
              <Card>
                <Card.Header>{`${p.nombre} ${p.apellido}`}</Card.Header>
                <Card.Body>
                  <div>Documento: {p.documento}</div>
                  <div>Sexo: {p.sexo}</div>
                  <div>Edad: {p.edad}</div>
                  <Button onClick={() => setPaciente(p)}>Ver más</Button>
                </Card.Body>
              </Card>
            </Container>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Pacientes;
