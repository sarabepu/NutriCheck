import React from "react";
import Preferencias from "./Preferencias";

import { Row, Col, Container, Card } from "react-bootstrap";
import Medidas from "./Medidas";

function Datos(props) {
  return (
    <Container>
      
      <Row>

        <Preferencias as={Col} user={props.user} setUser={props.setUser}></Preferencias>
        <Medidas as={Col} user={props.user} />
    
      </Row>
      <h1 className="white-text user-title" align="center">
              Comentarios de mi nutricionista: {props.user.nutricionista}
            </h1>
      <Card>
        <Card.Header>
          12/13/2020
          </Card.Header>
        <Card.Body>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Datos;
