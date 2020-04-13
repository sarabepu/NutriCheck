import React from "react";
import Preferencias from "./Preferencias";
import Dashboard from "./Dashboard";

import { Row, Col, Container, Card } from "react-bootstrap";
import Medidas from "./Medidas";

function Datos(props) {
  return (
    <Container>
      <h1 id="datos" className="white-text mt-2" align="center">
        Mis datos ({props.user.username})
      </h1>
      <Row>
        <Medidas as={Col} user={props.user} setUser={props.setUser} />
        <Preferencias
          as={Col}
          user={props.user}
          setUser={props.setUser}
        ></Preferencias>
      </Row>
      <br></br>
      <Row>
        <Dashboard as={Col} user={props.user}></Dashboard>
      </Row>
      <h1 className="white-text user-title" align="center">
        Comentarios de mi nutricionista: {props.user.nutricionista}
      </h1>
      <Card>
        <Card.Header>12/13/2020</Card.Header>
        <Card.Body></Card.Body>
      </Card>
    </Container>
  );
}

export default Datos;
