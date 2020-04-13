import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import PreferenciasPaciente from "./PreferenciasPaciente";
import PacienteDieta from "./PacienteDieta";
import Grafica from "./Grafica";

function Paciente(props) {
  return (
    <Container className="main-container">
      <Container>
        <h1 id="datos" className="white-text mt-5" align="center">
          Datos paciente -{" "}
          {`${props.paciente.nombre} ${props.paciente.apellido}`}
        </h1>
        <Row>
          <PreferenciasPaciente
            as={Col}
            paciente={props.paciente}
          ></PreferenciasPaciente>
          <Grafica as={Col} user={props.paciente}></Grafica>
        </Row>
      </Container>
      <br></br>

      <h1 className="white-text user-title" align="center">
        Dieta
      </h1>
      <Row>
        <PacienteDieta
          as={Col}
          paciente={props.paciente}
          setPaciente={props.setPaciente}
        ></PacienteDieta>
      </Row>
    </Container>
  );
}

export default Paciente;
