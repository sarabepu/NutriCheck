import React from "react";
import { Card, Container } from "react-bootstrap";
import LineChart from "./LineChart";

function Grafica(props) {
  return (
    <Container className="graph-card">
      <Card>
        <Card.Header>Mi progreso</Card.Header>

        <Card.Body>
          <div className="overflow-auto card-content">
            <div className="chart-wrapper">
              <LineChart
                data={props.user.historial}
                title="Peso"
                color="#F28444"
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Grafica;
