import React from "react";
import { Card, Container } from "react-bootstrap";

function DietaDia(props) {
  let dia = new Date().getDay();
  return (
    <Container className="sub-card">
      <Card>
        <Card.Header>Mi dieta del día</Card.Header>

        <Card.Body>
          <div className="overflow-auto card-content">
            {props.user.dieta && props.user.dieta[dia] ? (
              <>
                <div className="subtitle">Desayuno</div>
                <div className="diet">props.user.dieta[dia][0]</div>
                <hr />
                <div className="subtitle">Almuerzo</div>
                <div className="diet">props.user.dieta[dia][1]</div>
                <hr />
                <div className="subtitle">Cena</div>
                <div className="diet">props.user.dieta[dia][2]/</div>
              </>
            ) : (
              <p>
                Tu nutricionista todavía no te ha asignado una dieta. Vuelve a
                revisar más tarde.
              </p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DietaDia;
