import React from "react";
import Preferencias from "./Preferencias";

import { Row, Col, Container } from "react-bootstrap";
import Medidas from "./Medidas";

function Datos(props) {
  return (
      <Row>

        <Preferencias as={Col} user={props.user} setUser={props.setUser}></Preferencias>
        <Medidas as={Col} user={props.user} />
      </Row>
  );
}

export default Datos;
