import React from "react";
import Preferencias from "./Preferencias";

import { Row, Col, Container } from "react-bootstrap";
import Medidas from "./Medidas";

function Datos(props) {
  return (
    <Container>
      <h1 className="white-text mt-2" align="center">
        Mis datos ({props.user.username})
      </h1>
      <Row>
        <Preferencias
          as={Col}
          user={props.user}
          setUser={props.setUser}
        ></Preferencias>
        <Medidas as={Col} user={props.user} />
      </Row>
    </Container>
  );
}

export default Datos;
