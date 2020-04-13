import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Grafica from "./Grafica";
import DietaDia from "./DietaDia";

function Dashboard(props) {
  return (
    <Container>
      <h1 id="progreso" className="white-text mt-2" align="center">
        Mi progreso
      </h1>
      <Row>
        <Grafica as={Col} user={props.user} setUser={props.setUser}></Grafica>
        <DietaDia as={Col} user={props.user}></DietaDia>
      </Row>
    </Container>
  );
}

export default Dashboard;
