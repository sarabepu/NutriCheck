import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Grafica from "./Grafica";

function Dashboard(props) {
  return (
    <Container>
      <h1 className="white-text mt-2" align="center">
        Mi progreso
      </h1>
      <Row>
        <Grafica as={Col} user={props.user} setUser={props.setUser}></Grafica>
      </Row>
    </Container>
  );
}

export default Dashboard;
